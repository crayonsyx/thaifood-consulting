export const siteConfig = {
  name: "ThaiFood Consulting",
  description:
    "F&B consulting firm with Michelin-starred experience, helping restaurants and food businesses launch, grow, and optimize in Thailand and Southeast Asia.",
  url: "https://thaifood-consulting.vercel.app",
  ogImage: "/api/og?title=ThaiFood%20Consulting&subtitle=F%26B%20Consulting%20with%20Michelin-Starred%20Experience",
  email: "hello@thaifoodconsulting.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+6587517413",
  phone: "+6587517413",
  address: {
    city: "Bangkok",
    country: "Thailand",
  },
  social: {
    linkedin: "https://linkedin.com/company/thaifood-consulting",
    instagram: "https://instagram.com/thaifoodconsulting",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "5", label: "Countries" },
] as const;

export const categories = [
  { label: "All", slug: "all" },
  { label: "Opening a Restaurant", slug: "opening-a-restaurant" },
  { label: "Menu Engineering", slug: "menu-engineering" },
  { label: "F&B Trends", slug: "fnb-trends" },
  { label: "Operations", slug: "operations" },
  { label: "Marketing", slug: "marketing" },
  { label: "Financial Management", slug: "financial-management" },
  { label: "Technology", slug: "technology" },
  { label: "Scaling & Growth", slug: "scaling" },
] as const;
