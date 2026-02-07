import PostCard from "./PostCard";

interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  coverImageAlt?: string;
  body: string;
}

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-foreground-muted text-lg">
          No posts found in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
