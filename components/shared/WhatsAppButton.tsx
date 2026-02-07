"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppButton() {
  const whatsappNumber = siteConfig.whatsapp.replace("+", "");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackWhatsAppClick("floating_button")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}
