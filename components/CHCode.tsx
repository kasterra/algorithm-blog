import type { RawCode } from "codehike/code";
import { highlight, Pre } from "codehike/code";
import { callout } from "@/lib/codehike-annotations";

// Server Component: async highlight + Pre with annotation handlers
export async function CHCode({ codeblock }: { codeblock: RawCode }) {
  // Generate both themes and toggle with CSS classes to match app theme
  const [lightCode, darkCode] = await Promise.all([
    highlight(codeblock, "github-light"),
    highlight(codeblock, "github-dark"),
  ]);
  return (
    <div className="mdx-codeblock mb-6 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-card/50 dark:bg-zinc-950/60 shadow-sm overflow-hidden">
      {lightCode.meta ? (
        <div className="flex items-center justify-center text-[11px] text-muted-foreground/80 dark:text-zinc-300/80 py-2 border-b border-slate-200/60 dark:border-slate-800/60 bg-muted/50 dark:bg-zinc-900/50">
          {lightCode.meta}
        </div>
      ) : null}
      <div>
        <Pre
          className="ch-pre block dark:hidden"
          code={lightCode}
          handlers={[callout]}
        />
        <Pre
          className="ch-pre hidden dark:block"
          code={darkCode}
          handlers={[callout]}
        />
      </div>
    </div>
  );
}
