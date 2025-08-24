import { BlogHeader } from "@/components/blog-header";
import { BlogPostCard } from "@/components/blog-post-card";
import { posts as rawPosts } from "@/.velite";
import type { Post as VelitePost } from "@/.velite";
import { PaginationControls } from "@/components/PaginationControls";

const POSTS_PER_PAGE = 6;

type Difficulty = "Easy" | "Medium" | "Hard";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Map Velite posts into card shape with sensible defaults (server-side)
  const posts = rawPosts as VelitePost[];
  const allPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p, idx) => ({
      id: String(idx + 1),
      title: p.title,
      summary: p.summary ?? "",
      difficulty: (
        ["Easy", "Medium", "Hard"] as readonly Difficulty[]
      ).includes((p.difficulty as Difficulty) ?? "Easy")
        ? (p.difficulty as Difficulty) ?? "Easy"
        : ("Easy" as const),
      category: p.category ?? "Uncategorized",
      tags: p.tags ?? [],
      readTime: p.readTime,
      publishedAt: p.date,
    }));

  const resolvedSearch = await searchParams;
  const pageParam = Array.isArray(resolvedSearch?.page)
    ? resolvedSearch?.page[0]
    : resolvedSearch?.page;
  const currentPage = Math.max(1, Number(pageParam ?? 1) || 1);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold mb-2">
            카스테라의 알고리즘 분관
          </h2>
          <p className="text-muted-foreground">
            프론트엔드 개발자 카스테라의 알고리즘 문제해결(PS) 일기장
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      </main>
    </div>
  );
}
