import type { InlineAnnotation, AnnotationHandler } from "codehike/code"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = (annotation as any).data || {}
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${(column ?? 0) + 4}ch` }}
          className="w-fit border rounded px-2 py-1 relative -ml-[1ch] mt-1 whitespace-break-spaces text-[11px]
                     bg-zinc-100 text-zinc-800 border-slate-300 shadow-sm
                     dark:bg-zinc-800 dark:text-zinc-100 dark:border-slate-600"
        >
          <div
            style={{ left: `${column ?? 0}ch` }}
            className="absolute border-l border-t w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px]
                       bg-zinc-100 dark:bg-zinc-800 border-slate-300 dark:border-slate-600"
          />
          {annotation.query}
        </div>
      </>
    )
  },
}
