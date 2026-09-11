import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "../app/api/inquiries/route";

const origin = "https://fastforwardlabs-web.vercel.app";
const endpoint = `${origin}/api/inquiries`;
const message = {
  name: "Test Operator",
  email: "operator@example.com",
  company: "Example Ltd",
  service: "business-automation",
  message: "We want to automate document collection and client reminders.",
  website: "",
};

async function session() {
  const response = await GET();
  const { token } = await response.json();
  const cookie = response.headers.get("set-cookie")!.split(";")[0];
  vi.setSystemTime(Date.now() + 3000);
  return { token, cookie };
}

function request(body: object, cookie: string, requestOrigin = origin) {
  return new Request(endpoint, {
    method: "POST",
    headers: { origin: requestOrigin, cookie, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.stubEnv("INQUIRY_FORM_SECRET", "test-secret-at-least-thirty-two-characters");
  vi.stubEnv("RESEND_API_KEY", "test-key-not-a-real-credential");
  vi.stubEnv("INQUIRY_FROM_EMAIL", "Website <website@example.com>");
  vi.stubEnv("INQUIRY_TO_EMAIL", "private@example.com");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("private service inquiry delivery", () => {
  it("sends to the server-configured recipient with a safe reply-to and idempotency key", async () => {
    const send = vi.fn().mockResolvedValue(Response.json({ id: "email-123" }));
    vi.stubGlobal("fetch", send);
    const { token, cookie } = await session();
    const response = await POST(request({ ...message, token, to: "attacker@example.com" }, cookie));
    expect(response.status).toBe(200);
    const [url, options] = send.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const payload = JSON.parse(options.body);
    expect(payload.to).toEqual(["private@example.com"]);
    expect(payload.reply_to).toBe(message.email);
    expect(payload.text).toContain(message.message);
    expect(options.headers["Idempotency-Key"]).toMatch(/^inquiry-/);
    expect(JSON.stringify(await response.json())).not.toContain("private@example.com");
  });

  it("rejects cross-origin requests before sending email", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const { token, cookie } = await session();
    expect((await POST(request({ ...message, token }, cookie, "https://other.example"))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("silently discards honeypot submissions", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const { token, cookie } = await session();
    expect((await POST(request({ ...message, token, website: "spam.example" }, cookie))).status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects tampered tokens, missing cookies, immediate submissions, and expired forms", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const response = await GET();
    const { token } = await response.json();
    const cookie = response.headers.get("set-cookie")!.split(";")[0];
    expect((await POST(request({ ...message, token }, cookie))).status).toBe(400);
    vi.setSystemTime(Date.now() + 3000);
    expect((await POST(request({ ...message, token: `${token}x` }, cookie))).status).toBe(400);
    expect((await POST(request({ ...message, token: `${token.split(".")[0]}.${"é".repeat(43)}` }, cookie))).status).toBe(400);
    expect((await POST(request({ ...message, token }, ""))).status).toBe(400);
    vi.setSystemTime(Date.now() + 3_600_001);
    expect((await POST(request({ ...message, token }, cookie))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    { email: "not-an-email" },
    { email: "test@example.com\r\nBcc: other@example.com" },
    { service: "invented-service" },
    { message: "" },
    { message: "x".repeat(5001) },
    { name: { unexpected: "object" } },
  ])("validates the input on the server: %j", async (invalid) => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const { token, cookie } = await session();
    expect((await POST(request({ ...message, ...invalid, token }, cookie))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("handles malformed and oversized bodies", async () => {
    const { cookie } = await session();
    const malformed = new Request(endpoint, { method: "POST", headers: { origin, cookie, "Content-Type": "application/json" }, body: "{" });
    expect((await POST(malformed)).status).toBe(400);
    expect((await POST(request({ message: "x".repeat(16_001) }, cookie))).status).toBe(413);
  });

  it("never reports success on a provider failure or missing configuration", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "provider detail" }, { status: 500 })));
    const { token, cookie } = await session();
    const response = await POST(request({ ...message, token }, cookie));
    expect(response.status).toBe(502);
    expect(JSON.stringify(await response.json())).not.toContain("provider detail");
    vi.stubEnv("INQUIRY_TO_EMAIL", "");
    expect((await POST(request({ ...message, token }, cookie))).status).toBe(503);
  });
});
