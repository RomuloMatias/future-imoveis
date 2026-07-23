"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

const SCROLL_DEPTHS = [25, 50, 75, 90, 100];

export function TrackingManager() {
  useEffect(() => {
    trackEvent("page_view", { page_title: document.title, referrer: document.referrer || undefined });

    const reached = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      SCROLL_DEPTHS.forEach((threshold) => {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackEvent("scroll_depth", { percent_scrolled: threshold });
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>("a,button");
      if (!element || element.closest("[data-tracking-ignore]")) return;
      const anchor = element instanceof HTMLAnchorElement ? element : null;
      const section = element.closest<HTMLElement>("section");
      trackEvent(element.dataset.trackingEvent || "button_click", {
        element_text: element.dataset.trackingLabel || element.textContent?.trim().replace(/\s+/g, " ").slice(0, 120),
        element_id: element.id || undefined,
        element_type: element.tagName.toLowerCase(),
        link_url: anchor?.href,
        link_target: anchor?.target || undefined,
        section_id: section?.id || (element.closest("header") ? "header" : undefined),
        lot_id: element.dataset.lotId,
        lot_name: element.dataset.lotName,
        cta_location: element.dataset.ctaLocation,
      });
    };

    const observed = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting && id && !observed.has(id)) {
          observed.add(id);
          trackEvent("section_view", { section_id: id });
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => observer.observe(section));

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
