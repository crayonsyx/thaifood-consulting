import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

interface CaseStudyCardProps {
  study: {
    title: string;
    slug: string;
    industry: string;
    excerpt?: string | null;
    coverImage?: string | null;
    coverImageAlt?: string | null;
    metrics?: ({
      label?: string | null;
      before?: string | null;
      after?: string | null;
    } | null)[] | null;
  };
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const firstMetric = study.metrics?.find(
    (m): m is { label: string; before: string; after: string } =>
      Boolean(m?.label && m?.before && m?.after)
  );

  return (
    <Link href={`/case-studies/${study.slug}`} className="group block">
      <article className="rounded-xl border border-border bg-background-card overflow-hidden transition-colors duration-300 hover:border-accent-gold">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={study.coverImage ?? images.caseStudies.italianBistro}
            alt={study.coverImageAlt ?? study.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <span className="absolute top-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs uppercase tracking-wider text-accent-gold">
            {study.industry}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl text-foreground group-hover:text-accent-gold-light transition-colors duration-200">
            {study.title}
          </h3>
          <p className="text-foreground-muted text-sm line-clamp-2 mt-2 mb-4">
            {study.excerpt ?? ""}
          </p>
          {firstMetric && (
            <div className="mb-4">
              <span className="text-foreground-subtle text-xs uppercase tracking-wider">
                {firstMetric.label}
              </span>
              <p className="text-accent-gold text-2xl font-heading font-bold mt-1">
                {firstMetric.after}
              </p>
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-sm text-accent-gold transition-colors group-hover:text-accent-gold-light">
            Read Case Study <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
