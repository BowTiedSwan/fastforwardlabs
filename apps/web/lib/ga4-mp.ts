/**
 * GA4 Measurement Protocol — server-side event send.
 * Fires even when the browser blocks googletagmanager.com / gtag collect.
 *
 * Setup: GA4 Admin → Data streams → your stream → Measurement Protocol API secrets
 * Env: GA4_API_SECRET, NEXT_PUBLIC_GA_ID (optional override)
 */

import { GA_MEASUREMENT_ID } from "./analytics";

function clientIdFromCookie(cookieHeader: string | null): string {
  const match = cookieHeader?.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
  return match?.[1] ?? crypto.randomUUID();
}

export async function trackInquiryServer(
  request: Request,
  service: string,
): Promise<void> {
  const apiSecret = process.env.GA4_API_SECRET;
  if (!apiSecret) return;

  const params = {
    method: "inquiry_form",
    lead_source: service,
    form_id: "contact_inquiry",
    form_name: service,
    engagement_time_msec: 1,
  };

  const body = {
    client_id: clientIdFromCookie(request.headers.get("cookie")),
    events: [
      { name: "generate_lead", params },
      { name: "form_submit", params },
    ],
  };

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(GA_MEASUREMENT_ID)}&api_secret=${encodeURIComponent(apiSecret)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      },
    );
  } catch {
    /* never fail the inquiry response because analytics is down */
  }
}
