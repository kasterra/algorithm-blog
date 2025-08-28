import { Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDX } from "@/lib/mdx";
import { CHCode } from "@/components/CHCode";
import { posts } from "@/.velite";
import type { Post } from "@/.velite";
import GiscusComments from "@/components/Giscus";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug) as Post | undefined;

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} - Kasterra's PS`,
    description: post.summary || undefined,
    keywords: Array.isArray(post.tags) ? post.tags : undefined,
    openGraph: {
      title: `${post.title} - Kasterra's PS`,
      description: post.summary || undefined,
      type: "article",
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Kasterra's PS`,
      description: post.summary || undefined,
    },
    alternates: {
      canonical: `https://kasterra-algorithm-blog.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug) as Post | undefined;
  if (!post) return notFound();
  const readTime = post.readTime;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="font-sans text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        <div className="mdx-content">
          <MDX code={post.code} components={{ CHCode }} />
        </div>

        <div className="mt-12 border-t pt-8">
          <GiscusComments
            repo="kasterra/algorithm-blog"
            repoId="R_kgDOPjNFUQ"
            category="Announcements"
            categoryId="DIC_kwDOPjNFUc4Cuhy3"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            lang="ko"
          />
        </div>
    </article>
  );
}
