import * as React from "react"
import * as jsxRuntime from "react/jsx-runtime"

// Lightweight MDX runtime for Velite/Contentlayer-style `code` strings
// Returns a React component for a given compiled MDX `code` string
export function getMDXComponent(code: string): React.ComponentType<any> {
  // The compiled `code` expects the jsx runtime as the first argument
  // and returns a module-like object with `default` being the component.
  const fn = new Function(code)
  const mdxModule = fn(jsxRuntime as any)
  return mdxModule.default
}

export function MDX({ code, components = {} }: { code: string; components?: Record<string, any> }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
}

