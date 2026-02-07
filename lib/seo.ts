import { siteConfig } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: "TH",
    },
    areaServed: [
      { "@type": "Country", name: "Thailand" },
      { "@type": "City", name: "Bangkok" },
      { "@type": "Country", name: "Singapore" },
    ],
    serviceType: [
      "Restaurant Consulting",
      "Menu Engineering",
      "F&B Business Strategy",
      "Cloud Kitchen Consulting",
      "Restaurant Concept Development",
    ],
    priceRange: "$$$$",
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Penny",
    jobTitle: "F&B Consultant & Founder",
    description:
      "Michelin-starred culinary consultant with 15+ years of experience in Thailand and Southeast Asia",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    knowsAbout: [
      "Restaurant Consulting",
      "Menu Engineering",
      "Fine Dining",
      "F&B Operations",
    ],
  };
}

export function articleSchema({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
  authorName = "Penny",
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
  };
}

export function contactSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: ["English"],
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: "TH",
    },
  };
}
