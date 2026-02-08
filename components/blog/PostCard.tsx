import Image from "next/image";
import Link from "next/link";
import { formatDate, estimateReadingTime } from "@/lib/utils";
import { images } from "@/lib/images";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    category: string;
    coverImage?: string;
    coverImageAlt?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const readTime = estimateReadingTime(post.body);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-xl border border-border bg-background-card overflow-hidden transition-colors duration-300 hover:border-accent-gold">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImage || images.blog.defaultCover}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6">
          <span className="text-accent-gold uppercase text-xs tracking-wider font-medium">
            {post.category.replace(/-/g, " ")}
          </span>
          <h3 className="font-heading text-xl text-foreground mt-2 mb-2 group-hover:text-accent-gold-light transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-foreground-muted text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-foreground-subtle text-xs">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
