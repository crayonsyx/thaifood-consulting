import { ArrowRight } from "lucide-react";

interface MetricsGridProps {
  metrics: {
    label: string;
    before: string;
    after: string;
  }[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div
      className={`grid gap-6 ${
        metrics.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-3"
      }`}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-background-card border border-border rounded-xl p-6 text-center"
        >
          <p className="text-foreground-muted text-sm uppercase tracking-wider mb-4">
            {metric.label}
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-foreground-subtle line-through text-lg">
              {metric.before}
            </span>
            <ArrowRight className="h-5 w-5 text-foreground-subtle shrink-0" />
            <span className="text-accent-gold text-3xl font-heading font-bold">
              {metric.after}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
