export const auditBookingUrl = "https://cal.com/fast-forward-labs/systems-audit";

export type AuditPlacement =
  | "header"
  | "home_hero"
  | "home_audit"
  | "contact"
  | "service_hero"
  | "service_audit";

export function withUtm(
  href: string,
  params: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
  },
): string {
  const url = new URL(href);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export function auditBookingHref(placement: AuditPlacement): string {
  return withUtm(auditBookingUrl, {
    utm_source: "website",
    utm_medium: "cta",
    utm_campaign: "audit_call",
    utm_content: placement,
  });
}
