import { createInquiryToken, validateInquiryToken } from "../../../lib/inquiries.server";
import { inquiryOptions, type InquiryFields } from "../../../lib/inquiry-options";
import { trackInquiryServer } from "../../../lib/ga4-mp";

export const runtime = "nodejs";

const maxBodyBytes = 16_000;
const cookieName = "ffl_inquiry";

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function unavailable() {
  return json({ error: "The inquiry form is temporarily unavailable. Please try again later." }, 503);
}

export async function GET() {
  const secret = process.env.INQUIRY_FORM_SECRET;
  if (!secret || secret.length < 32) return unavailable();
  const { token, nonce } = createInquiryToken(secret);
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return json({ token }, 200, {
    "Set-Cookie": `${cookieName}=${nonce}; HttpOnly; SameSite=Strict; Path=/api/inquiries; Max-Age=3600${secure}`,
  });
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return json({ error: "Please send your inquiry from this website." }, 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json({ error: "Unsupported request format." }, 415);
  }

  // Bound the stream itself: Content-Length alone can be absent or forged.
  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) {
        await reader.cancel();
        return json({ error: "Your inquiry is too long. Please shorten it and try again." }, 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  // Bots commonly populate all fields. Humans never see this one.
  if (typeof body.website === "string" && body.website.trim()) return json({ success: true });

  const secret = process.env.INQUIRY_FORM_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!secret || secret.length < 32 || !apiKey || !from || !to) return unavailable();

  const nonce = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  const verifiedNonce = validateInquiryToken(body.token, nonce, secret);
  if (!verifiedNonce) {
    return json({ error: "Your form session needs refreshing. Please try sending again.", refreshToken: true }, 400);
  }

  const fields = Object.fromEntries(
    ["name", "email", "company", "service", "message"].map((field) => [field, typeof body[field] === "string" ? body[field].trim() : ""]),
  ) as Record<InquiryFields, string>;
  const errors: Partial<Record<InquiryFields, string>> = {};
  if (!fields.name || fields.name.length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (fields.company.length > 150) errors.company = "Use up to 150 characters for your company name.";
  const service = inquiryOptions.find((option) => option.value === fields.service);
  if (!service) errors.service = "Choose a service or select ‘not sure yet’.";
  if (fields.message.length < 10 || fields.message.length > 5000) errors.message = "Tell us a little about your inquiry (10–5,000 characters).";
  if (Object.keys(errors).length || !service) return json({ error: "Please check the highlighted fields.", errors }, 400);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Retries of this form cannot send duplicate notifications.
        "Idempotency-Key": `inquiry-${verifiedNonce}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `[Fast Forward Labs] ${service.label} inquiry`,
        text: `Service: ${service.label}\nName: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company || "Not provided"}\n\n${fields.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string") {
      // Log status only; provider messages may contain private addresses.
      console.error("Inquiry delivery rejected", { status: response.status });
      return json({ error: "We couldn’t send your inquiry. Your message is still here; please try again." }, 502);
    }
    void trackInquiryServer(request, fields.service);
    return json({ success: true });
  } catch {
    console.error("Inquiry delivery unavailable");
    return json({ error: "We couldn’t confirm delivery. Please try again; duplicate requests are handled automatically." }, 502);
  }
}
