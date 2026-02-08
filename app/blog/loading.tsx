export default function BlogLoading() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-4 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-10 bg-background-card rounded animate-pulse" />
        </div>

        {/* Heading skeleton */}
        <div className="mt-8 mb-12">
          <div className="h-10 w-64 bg-background-card rounded animate-pulse mb-4" />
          <div className="h-5 w-96 max-w-full bg-background-card rounded animate-pulse" />
        </div>

        {/* Category filter skeleton */}
        <div className="flex gap-3 mb-10">
          {[80, 60, 90, 70, 100].map((w, i) => (
            <div
              key={i}
              className="h-9 rounded-full bg-background-card animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Post grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border bg-background-card">
              <div className="aspect-video bg-background-secondary animate-pulse" />
              <div className="p-5">
                <div className="h-3 w-20 bg-background-secondary rounded animate-pulse mb-3" />
                <div className="h-5 w-full bg-background-secondary rounded animate-pulse mb-2" />
                <div className="h-5 w-3/4 bg-background-secondary rounded animate-pulse mb-4" />
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
