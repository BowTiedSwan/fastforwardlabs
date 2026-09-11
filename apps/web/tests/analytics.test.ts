import { afterEach, describe, expect, it, vi } from "vitest";

import { trackInquiryServer } from "../lib/ga4-mp";
import { auditBookingHref, auditBookingUrl, withUtm } from "../lib/site";

describe("audit booking UTMs", () => {
  it("keeps the confirmed Cal.com path and tags placement", () => {
    const href = auditBookingHref("header");
    const url = new URL(href);
    expect(`${url.origin}${url.pathname}`).toBe(auditBookingUrl);
    expect(url.searchParams.get("utm_source")).toBe("website");
    expect(url.searchParams.get("utm_medium")).toBe("cta");
    expect(url.searchParams.get("utm_campaign")).toBe("audit_call");
    expect(url.searchParams.get("utm_content")).toBe("header");
  });

  it("does not drop existing query params", () => {
    const href = withUtm("https://example.com/path?keep=1", {
      utm_source: "website",
      utm_medium: "cta",
      utm_campaign: "audit_call",
      utm_content: "contact",
    });
    const url = new URL(href);
    expect(url.searchParams.get("keep")).toBe("1");
    expect(url.searchParams.get("utm_content")).toBe("contact");
  });
});

describe("inquiry measurement protocol", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("does nothing without GA4_API_SECRET", async () => {
    vi.stubEnv("GA4_API_SECRET", "");
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    await trackInquiryServer(new Request("https://example.com/api/inquiries"), "business-automation");
    expect(send).not.toHaveBeenCalled();
  });

  it("posts generate_lead and form_submit when a secret is configured", async () => {
    vi.stubEnv("GA4_API_SECRET", "test-mp-secret");
    const send = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", send);
    await trackInquiryServer(
      new Request("https://example.com/api/inquiries", { headers: { cookie: "_ga=GA1.1.123.456" } }),
      "ai-training",
    );
    expect(send).toHaveBeenCalledTimes(1);
    const [url, options] = send.mock.calls[0];
    expect(String(url)).toContain("measurement_id=G-PBP6F9XNHR");
    expect(String(url)).toContain("api_secret=test-mp-secret");
    const body = JSON.parse(options.body);
    expect(body.client_id).toBe("123.456");
    expect(body.events.map((event: { name: string }) => event.name)).toEqual(["generate_lead", "form_submit"]);
    expect(body.events[0].params.lead_source).toBe("ai-training");
    expect(body.events[0].params.method).toBe("inquiry_form");
  });
});
