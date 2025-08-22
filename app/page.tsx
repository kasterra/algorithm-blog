"use client"

import { useState } from "react"
import { BlogHeader } from "@/components/blog-header"
import { BlogPostCard } from "@/components/blog-post-card"
import { Pagination } from "@/components/pagination"

const blogPosts = [
  {
    id: "1",
    title: "Mastering Two Pointers: Solving Array Problems Efficiently",
    summary:
      "Learn the two-pointer technique to solve array and string problems with optimal time complexity. We'll explore classic problems like finding pairs, removing duplicates, and palindrome validation.",
    difficulty: "Easy" as const,
    category: "Arrays & Strings",
    tags: ["Two Pointers", "Arrays", "Optimization"],
    readTime: "8 min read",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Dynamic Programming: From Recursion to Memoization",
    summary:
      "Understand how to transform recursive solutions into efficient dynamic programming algorithms. We'll cover the Fibonacci sequence, coin change, and longest common subsequence problems.",
    difficulty: "Medium" as const,
    category: "Dynamic Programming",
    tags: ["DP", "Memoization", "Recursion"],
    readTime: "12 min read",
    publishedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Graph Traversal: BFS vs DFS Deep Dive",
    summary:
      "Compare breadth-first search and depth-first search algorithms with practical implementations. Learn when to use each approach and solve real-world graph problems.",
    difficulty: "Medium" as const,
    category: "Trees & Graphs",
    tags: ["BFS", "DFS", "Graph Theory"],
    readTime: "10 min read",
    publishedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Advanced Tree Algorithms: Segment Trees and Fenwick Trees",
    summary:
      "Dive into advanced tree data structures for range queries and updates. Perfect for competitive programming and handling large datasets efficiently.",
    difficulty: "Hard" as const,
    category: "Trees & Graphs",
    tags: ["Segment Tree", "Fenwick Tree", "Range Queries"],
    readTime: "15 min read",
    publishedAt: "2024-01-08",
  },
  {
    id: "5",
    title: "Binary Search: Beyond Finding Elements",
    summary:
      "Explore advanced binary search applications including finding boundaries, searching in rotated arrays, and solving optimization problems with binary search on answers.",
    difficulty: "Medium" as const,
    category: "Sorting & Searching",
    tags: ["Binary Search", "Optimization", "Problem Solving"],
    readTime: "9 min read",
    publishedAt: "2024-01-05",
  },
  {
    id: "6",
    title: "Sliding Window Technique: Maximum Efficiency",
    summary:
      "Master the sliding window pattern for solving substring and subarray problems. Learn fixed-size and variable-size window approaches with practical examples.",
    difficulty: "Easy" as const,
    category: "Arrays & Strings",
    tags: ["Sliding Window", "Subarray", "Optimization"],
    readTime: "7 min read",
    publishedAt: "2024-01-03",
  },
  {
    id: "7",
    title: "Heap Data Structure: Priority Queues in Action",
    summary:
      "Learn how to implement and use heaps for solving priority-based problems. Cover min-heap, max-heap, and their applications in algorithms like Dijkstra's shortest path.",
    difficulty: "Medium" as const,
    category: "Data Structures",
    tags: ["Heap", "Priority Queue", "Graph Algorithms"],
    readTime: "11 min read",
    publishedAt: "2024-01-01",
  },
  {
    id: "8",
    title: "Backtracking: Exploring All Possibilities",
    summary:
      "Master the backtracking technique for solving constraint satisfaction problems. Learn to generate permutations, combinations, and solve N-Queens problem.",
    difficulty: "Hard" as const,
    category: "Recursion & Backtracking",
    tags: ["Backtracking", "Recursion", "Constraint Satisfaction"],
    readTime: "13 min read",
    publishedAt: "2023-12-28",
  },
  {
    id: "9",
    title: "Trie Data Structure: Efficient String Operations",
    summary:
      "Implement and use Trie (prefix tree) for efficient string searching, auto-completion, and word validation. Perfect for building search engines and spell checkers.",
    difficulty: "Medium" as const,
    category: "Data Structures",
    tags: ["Trie", "String Processing", "Search"],
    readTime: "10 min read",
    publishedAt: "2023-12-25",
  },
  {
    id: "10",
    title: "Union-Find: Disjoint Set Operations",
    summary:
      "Learn the Union-Find data structure for efficiently handling disjoint sets. Essential for solving connectivity problems and implementing Kruskal's algorithm.",
    difficulty: "Medium" as const,
    category: "Data Structures",
    tags: ["Union-Find", "Disjoint Sets", "Graph Connectivity"],
    readTime: "9 min read",
    publishedAt: "2023-12-22",
  },
]

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
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
