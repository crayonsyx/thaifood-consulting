interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialBlock({
  quote,
  author,
  role,
}: TestimonialBlockProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="border-t border-accent-gold/30 mb-12" />
        <span className="font-heading text-6xl text-accent-gold leading-none">
          &ldquo;
        </span>
        <blockquote className="mt-2 font-heading text-2xl italic leading-relaxed text-foreground">
          {quote}
        </blockquote>
        <div className="mt-8">
          <p className="font-medium text-foreground">{author}</p>
          <p className="text-sm text-foreground-muted">{role}</p>
        </div>
        <div className="border-b border-accent-gold/30 mt-12" />
      </div>
    </section>
  );
}
