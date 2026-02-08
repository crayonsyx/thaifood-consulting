export default function CaseStudyLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative flex min-h-[60vh] items-end">
        <div className="absolute inset-0 bg-background-secondary animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            {/* Breadcrumbs skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-background-card/50 rounded animate-pulse" />
              <div className="h-4 w-4 bg-background-card/50 rounded animate-pulse" />
              <div className="h-4 w-24 bg-background-card/50 rounded animate-pulse" />
              <div className="h-4 w-4 bg-background-card/50 rounded animate-pulse" />
              <div className="h-4 w-32 bg-background-card/50 rounded animate-pulse" />
            </div>
            <div className="mt-6">
              <div className="h-6 w-24 bg-background-card/50 rounded-full animate-pulse" />
            </div>
            <div className="h-12 w-3/4 bg-background-card/50 rounded animate-pulse mt-4" />
            <div className="mt-4 flex items-center gap-4">
              <div className="h-4 w-28 bg-background-card/50 rounded animate-pulse" />
              <div className="h-4 w-24 bg-background-card/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-background-card rounded animate-pulse"
              style={{ width: `${70 + Math.random() * 30}%` }}
            />
          ))}
          <div className="h-8 w-2/3 bg-background-card rounded animate-pulse mt-8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-4 bg-background-card rounded animate-pulse"
              style={{ width: `${65 + Math.random() * 35}%` }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
