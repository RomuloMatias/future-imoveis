export type TrackingValue = string | number | boolean | null | undefined;
export type TrackingPayload = Record<string, TrackingValue>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Contrato único usado pelos componentes e por todas as integrações. */
export function trackEvent(event: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
    page_path: window.location.pathname,
    page_location: window.location.href,
    event_timestamp: new Date().toISOString(),
  });
  window.gtag?.("event", event, payload);
  if (event === "generate_lead") window.fbq?.("track", "Lead", payload);
  else if (event !== "page_view") window.fbq?.("trackCustom", event, payload);
  window.clarity?.("event", event);
}
