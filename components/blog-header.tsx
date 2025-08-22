import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-serif text-2xl font-bold">Algorithm Mastery</h1>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search algorithms..." className="pl-10 bg-white text-foreground" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Posts</DropdownMenuItem>
                <DropdownMenuItem>Arrays & Strings</DropdownMenuItem>
                <DropdownMenuItem>Trees & Graphs</DropdownMenuItem>
                <DropdownMenuItem>Dynamic Programming</DropdownMenuItem>
                <DropdownMenuItem>Sorting & Searching</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
