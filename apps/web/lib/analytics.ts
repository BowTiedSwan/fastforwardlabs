export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-PBP6F9XNHR";
const GA_ID = GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
  return window.gtag;
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  const gtag = ensureGtag();
  if (!gtag) return;
  gtag("event", name, { send_to: GA_ID, ...params });
}

export function trackPageView(path: string) {
  trackEvent("page_view", {
    page_path: path,
    page_location: typeof window === "undefined" ? undefined : window.location.href,
    page_title: typeof document === "undefined" ? undefined : document.title,
  });
}

/** Client-side mirror of the server Measurement Protocol hit. */
export function trackInquirySubmit(service: string) {
  const params = {
    method: "inquiry_form",
    lead_source: service,
    form_id: "contact_inquiry",
    form_name: service,
  };
  trackEvent("generate_lead", params);
  trackEvent("form_submit", params);
}

export function trackFormStart() {
  trackEvent("form_start", { form_id: "contact_inquiry", form_name: "contact_inquiry" });
}

export function trackProps(contentType: string, placement: string, itemId?: string) {
  return {
    "data-track": contentType,
    "data-track-placement": placement,
    ...(itemId ? { "data-track-name": itemId } : {}),
  };
}
