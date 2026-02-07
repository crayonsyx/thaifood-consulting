import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground-subtle">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-accent-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span aria-hidden="true">&gt;</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
