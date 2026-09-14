export const site = {
  name: "Fast Forward Labs",
  url: "https://fastforwardlabs-web.vercel.app",
  description: "AI consulting and implementation: audits and advisory, business automation, executive and staff training, and AI content systems. One-time builds or ongoing support.",
};

// Shared by the homepage and its generated social card.
export const homeContent = {
  title: "AI Consulting, Automation & Training",
  description: "AI audits, business automation, executive and staff training, and AI content systems. One-time builds or ongoing support from Fast Forward Labs.",
  eyebrow: "AI consulting & implementation",
  headline: ["Put AI to work", "in your business"],
  introduction: "Find the right opportunities, automate the busywork, and give your team the skills to use AI well. We advise, build, and train, from your first audit call to ongoing AI leadership.",
};

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
