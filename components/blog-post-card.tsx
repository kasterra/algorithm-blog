import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "./difficulty-badge";
import { Clock } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-xl font-bold leading-tight line-clamp-2 flex-1">
            {post.title}
          </h3>
          <DifficultyBadge difficulty={post.difficulty} />
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {/* Apply orange styling to all categories */}
          <Badge
            variant="default"
            className="text-xs bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50 dark:hover:bg-orange-800/40"
          >
            {post.category}
          </Badge>
          {post.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-muted-foreground/50 hover:border-foreground/60 hover:text-foreground dark:border-muted-foreground/70 dark:text-muted-foreground dark:hover:border-foreground/80 dark:hover:text-foreground text-slate-50 bg-slate-800"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.summary}
        </p>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{post.readTime}</span>
        </div>

        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
