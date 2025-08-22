"use client"

import { useMemo, useState } from "react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Pagination } from "@/components/pagination"
import { posts } from "@/.velite"

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  // Map Velite posts into card shape with sensible defaults
  const allPosts = useMemo(() => {
    return posts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((p, idx) => ({
        id: String(idx + 1),
        title: p.title,
        summary: "", // optional until added to schema/frontmatter
        difficulty: "Easy" as const, // default until schema supports it
        category: "Uncategorized",
        tags: [] as string[],
        readTime: "",
        publishedAt: p.date,
      }))
  }, [])

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = allPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold mb-2">Latest Algorithm Insights</h2>
          <p className="text-muted-foreground">
            Enhance your problem-solving skills with expert tutorials and in-depth algorithm analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
    </div>
  )
}
