"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-heading text-lg font-bold pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-foreground-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 text-foreground-muted leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

interface FAQAccordionProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div>
      {faqs.map((faq) => (
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}
