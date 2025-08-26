"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  content: string
}

export function CodeBlock({ content }: CodeBlockProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  // Parse markdown-like content
  const parseContent = (text: string) => {
    const parts = text.split(/```(\w+)?\n([\s\S]*?)```/g)
    const elements = []

    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Regular text content
        if (parts[i].trim()) {
          elements.push(
            <div key={i} className="prose-content">
              {parts[i].split("\n").map((line, lineIndex) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={lineIndex} className="font-sans text-2xl font-bold mt-8 mb-4 text-foreground">
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={lineIndex} className="font-sans text-xl font-semibold mt-6 mb-3 text-foreground">
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.trim() === "") {
                  return <br key={lineIndex} />
                }

                // Handle inline code
                const processedLine = line.replace(
                  /`([^`]+)`/g,
                  '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>',
                )

                return (
                  <p
                    key={lineIndex}
                    className="mb-4 leading-relaxed text-foreground"
                    dangerouslySetInnerHTML={{ __html: processedLine }}
                  />
                )
              })}
            </div>,
          )
        }
      } else if (i % 3 === 1) {
        // Language identifier (skip)
        continue
      } else {
        // Code block content
        const language = parts[i - 1] || "text"
        const code = parts[i].trim()

        if (code) {
          elements.push(
            <div key={i} className="relative mb-6">
              <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border">
                <span className="text-sm font-medium text-muted-foreground">{language}</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(code)} className="h-8 w-8 p-0">
                  {copiedCode === code ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="bg-card border border-t-0 rounded-b-lg p-4 overflow-x-auto">
                <code className="font-mono text-sm leading-relaxed text-foreground">{code}</code>
              </pre>
            </div>,
          )
        }
      }
    }

    return elements
  }

  return <div className="space-y-4">{parseContent(content)}</div>
}
