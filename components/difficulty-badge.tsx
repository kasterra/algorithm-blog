import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard"
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const variants = {
    Easy: "bg-green-100 text-green-800 hover:bg-green-100",
    Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Hard: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  return (
    <Badge variant="secondary" className={cn("text-xs font-medium", variants[difficulty])}>
      {difficulty}
    </Badge>
  )
}
