"use client";

type EventName =
  | "consultation_form_submitted"
  | "cta_clicked"
  | "whatsapp_click"
  | "case_study_viewed"
  | "scroll_depth";

interface EventParams {
  [key: string]: string | number | boolean;
}

export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  if (w.gtag) {
    w.gtag("event", name, params);
  }
}

export function trackCTAClick(buttonText: string, location: string) {
  trackEvent("cta_clicked", {
    button_text: buttonText,
    button_location: location,
    page_path: window.location.pathname,
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    page_location: location,
    page_path: window.location.pathname,
  });
}

export function trackFormSubmission(formType: string) {
  trackEvent("consultation_form_submitted", {
    form_type: formType,
    page_path: window.location.pathname,
  });
}
