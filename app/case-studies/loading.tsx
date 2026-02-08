export default function CaseStudiesLoading() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-4 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-24 bg-background-card rounded animate-pulse" />
        </div>

        {/* Heading skeleton */}
        <div className="mt-8 mb-12">
          <div className="h-10 w-48 bg-background-card rounded animate-pulse mb-4" />
          <div className="h-5 w-80 max-w-full bg-background-card rounded animate-pulse" />
        </div>

        {/* Case study cards skeleton */}
        <div className="grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border bg-background-card">
              <div className="aspect-[16/10] bg-background-secondary animate-pulse" />
              <div className="p-6">
                <div className="h-3 w-20 bg-background-secondary rounded animate-pulse mb-3" />
                <div className="h-6 w-3/4 bg-background-secondary rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-background-secondary rounded animate-pulse mb-1" />
                <div className="h-4 w-2/3 bg-background-secondary rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
