import Link from "next/link";

interface CTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTA({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors duration-200";

  const variants = {
    primary:
      "bg-accent-gold text-background hover:bg-accent-gold-light",
    secondary:
      "border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-background",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
