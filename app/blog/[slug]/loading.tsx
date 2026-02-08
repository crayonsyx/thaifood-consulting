export default function BlogPostLoading() {
  return (
    <article className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-4 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-10 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-4 bg-background-card rounded animate-pulse" />
          <div className="h-4 w-40 bg-background-card rounded animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="mt-8 mb-10">
          <div className="h-3 w-24 bg-background-card rounded animate-pulse mb-4" />
          <div className="h-10 w-full bg-background-card rounded animate-pulse mb-2" />
          <div className="h-10 w-3/4 bg-background-card rounded animate-pulse mb-6" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 bg-background-card rounded animate-pulse" />
            <div className="h-4 w-20 bg-background-card rounded animate-pulse" />
          </div>
        </div>

        {/* Cover image skeleton */}
        <div className="aspect-video rounded-xl bg-background-card animate-pulse mb-12" />

        {/* Content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-background-card rounded animate-pulse"
              style={{ width: `${75 + Math.random() * 25}%` }}
            />
          ))}
          <div className="h-8 w-2/3 bg-background-card rounded animate-pulse mt-8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-4 bg-background-card rounded animate-pulse"
              style={{ width: `${70 + Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
