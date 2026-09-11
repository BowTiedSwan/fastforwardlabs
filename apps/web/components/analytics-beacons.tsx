"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { trackEvent, trackPageView } from "@/lib/analytics";

export function AnalyticsBeacons() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPath = useRef(true);

  useEffect(() => {
    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    if (initialPath.current) {
      initialPath.current = false;
      return;
    }
    trackPageView(path);
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const tracked = anchor.closest("[data-track]");
      if (!(tracked instanceof HTMLElement)) return;

      trackEvent("select_content", {
        content_type: tracked.dataset.track,
        item_id: tracked.dataset.trackName || anchor.getAttribute("href") || undefined,
        placement: tracked.dataset.trackPlacement,
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
