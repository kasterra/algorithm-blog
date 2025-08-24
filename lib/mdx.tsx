import type { ComponentType } from "react"
import * as jsxRuntime from "react/jsx-runtime"

// Lightweight MDX runtime for Velite/Contentlayer-style `code` strings
// Returns a React component for a given compiled MDX `code` string
type MDXComponent = ComponentType<{ components?: Record<string, unknown> }>

export function getMDXComponent(code: string): MDXComponent {
  // The compiled `code` expects the jsx runtime as the first argument
  // and returns a module-like object with `default` being the component.
  const fn = new Function(code)
  const mdxModule = fn(jsxRuntime as unknown as Record<string, unknown>) as {
    default: MDXComponent
  }
  return mdxModule.default
}

export function MDX({ code, components = {} }: { code: string; components?: Record<string, unknown> }) {
  const Component = getMDXComponent(code)
  // Server component: render compiled MDX with provided components
  return <Component components={components} />
}
