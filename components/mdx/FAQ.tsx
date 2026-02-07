"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-8">
      {items.map((item, index) => (
        <div key={index} className="border-b border-border">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between py-4 text-left text-foreground hover:text-accent-gold transition-colors duration-200"
            aria-expanded={openIndex === index}
          >
            <span className="font-heading text-lg pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 text-foreground-subtle transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-foreground-muted text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
