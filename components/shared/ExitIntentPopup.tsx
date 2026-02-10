"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

interface ExitIntentPopupProps {
  /** Lead magnet to offer */
  leadMagnet: string;
  /** Heading for the popup */
  heading?: string;
  /** Description text */
  description?: string;
  /** CTA button text */
  ctaText?: string;
  /** Tags for Brevo */
  tags?: string;
  /** Delay before enabling exit-intent detection (ms) */
  delay?: number;
}

const COOKIE_NAME = "lead_popup_dismissed";

export default function ExitIntentPopup({
  leadMagnet,
  heading = "Wait -- before you go",
  description,
  ctaText = "Get It Free",
  tags = "exit_intent",
  delay = 5000,
}: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Check if already dismissed this session
  useEffect(() => {
    const dismissed = document.cookie.includes(COOKIE_NAME);
    if (dismissed) return;

    const timer = setTimeout(() => setEnabled(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Desktop: detect mouse leaving viewport (moving toward browser chrome)
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      if (e.clientY <= 0) {
        setShow(true);
        setEnabled(false);
      }
    },
    [enabled]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  // Mobile: detect back button / visibility change (approximate)
  useEffect(() => {
    if (!enabled) return;

    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && enabled) {
        // Will show on return
        setShow(true);
        setEnabled(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled]);

  const dismiss = () => {
    setShow(false);
    // Set session cookie (expires when browser closes)
    document.cookie = `${COOKIE_NAME}=1; path=/; SameSite=Lax`;
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-background-secondary p-6 shadow-2xl md:p-8">
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <LeadCaptureForm
          leadMagnet={leadMagnet}
          heading={heading}
          description={description}
          ctaText={ctaText}
          tags={tags}
          source="exit_intent"
          variant="card"
          onSuccess={dismiss}
        />
      </div>
    </div>
  );
}
