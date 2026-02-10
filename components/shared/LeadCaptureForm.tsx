"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface LeadCaptureFormProps {
  /** What the user gets (e.g. "Free P&L Template", "Restaurant Cost Calculator") */
  leadMagnet: string;
  /** Short description of the offer */
  description?: string;
  /** Heading text */
  heading?: string;
  /** CTA button text */
  ctaText?: string;
  /** Tags for Brevo segmentation (e.g. "penny_fnb,blog_cta,cost_calculator") */
  tags?: string;
  /** Source identifier for tracking */
  source?: string;
  /** Variant: "inline" for blog embeds, "card" for standalone, "minimal" for popups */
  variant?: "inline" | "card" | "minimal";
  /** Optional callback after successful submission */
  onSuccess?: () => void;
}

export default function LeadCaptureForm({
  leadMagnet,
  description,
  heading,
  ctaText = "Get Free Access",
  tags = "",
  source = "website",
  variant = "card",
  onSuccess,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const resp = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim(),
          leadMagnet,
          tags,
          source,
          botcheck,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSuccess(true);
      trackEvent("consultation_form_submitted", {
        form_type: "lead_capture",
        lead_magnet: leadMagnet,
        page_path: window.location.pathname,
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={containerClass(variant)}>
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle className="h-10 w-10 text-accent-gold" />
          <p className="font-heading text-xl font-semibold">Check your inbox!</p>
          <p className="text-foreground-muted">
            We sent your {leadMagnet} to <strong className="text-foreground">{email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-medium text-background transition-colors hover:bg-accent-gold-light disabled:opacity-50"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {ctaText}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    );
  }

  return (
    <div className={containerClass(variant)}>
      {heading && (
        <h3 className="font-heading text-xl font-semibold md:text-2xl">
          {heading}
        </h3>
      )}
      {description && (
        <p className="mt-2 text-foreground-muted">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {/* Honeypot -- hidden from real users, bots will fill it */}
        <input
          type="text"
          name="botcheck"
          value={botcheck}
          onChange={(e) => setBotcheck(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold sm:w-1/3"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background-card px-4 py-3 text-foreground placeholder-foreground-subtle focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold sm:flex-1"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-gold px-6 py-3 font-medium text-background transition-colors hover:bg-accent-gold-light disabled:opacity-50 sm:w-auto"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {ctaText}
        </button>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <p className="text-xs text-foreground-subtle">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}

function containerClass(variant: string): string {
  if (variant === "inline") {
    return "my-8 rounded-xl border border-accent-gold/20 bg-background-secondary p-6";
  }
  return "rounded-xl border border-border bg-background-secondary p-6 md:p-8";
}
