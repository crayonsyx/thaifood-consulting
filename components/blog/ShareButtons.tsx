"use client";

import { useState } from "react";
import { Link2, Linkedin, Twitter, Check } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const buttonBase =
    "inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-foreground-muted hover:text-accent-gold hover:border-accent-gold transition-colors duration-200";

  return (
    <div className="flex items-center gap-2">
      <span className="text-foreground-subtle text-sm mr-1">Share:</span>
      <button
        onClick={handleCopyLink}
        className={buttonBase}
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      <button
        onClick={shareOnLinkedIn}
        className={buttonBase}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnTwitter}
        className={buttonBase}
        aria-label="Share on X"
        title="Share on X"
      >
        <Twitter className="w-4 h-4" />
      </button>
    </div>
  );
}
