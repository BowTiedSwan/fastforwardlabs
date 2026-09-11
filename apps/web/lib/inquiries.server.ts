import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const lifetime = 60 * 60 * 1000;

function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createInquiryToken(secret: string) {
  const nonce = randomBytes(24).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ nonce, issuedAt: Date.now() })).toString("base64url");
  return { nonce, token: `${payload}.${signature(payload, secret)}` };
}

export function validateInquiryToken(token: unknown, nonce: string | undefined, secret: string) {
  if (typeof token !== "string" || token.length > 512 || !nonce) return null;
  const [payload, supplied, extra] = token.split(".");
  if (!payload || !supplied || !/^[A-Za-z0-9_-]{43}$/.test(supplied) || extra) return null;
  const expected = signature(payload, secret);
  if (supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const age = Date.now() - data.issuedAt;
    if (data.nonce !== nonce || typeof data.issuedAt !== "number" || age < 2000 || age > lifetime) return null;
    return data.nonce as string;
  } catch {
    return null;
  }
}
