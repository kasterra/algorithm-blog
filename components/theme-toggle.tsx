"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 px-0"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-200" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
