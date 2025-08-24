"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Giscus = dynamic(() => import("@giscus/react"), { ssr: false });

type Mapping =
  | "pathname"
  | "url"
  | "title"
  | "og:title"
  | "specific"
  | "number";

type Bool01 = "0" | "1";

type ThemeName =
  | "light"
  | "dark"
  | "transparent_dark"
  | "preferred_color_scheme"
  | "light_high_contrast"
  | "dark_high_contrast"
  | "dark_dimmed"
  | "light_tritanopia"
  | "dark_tritanopia"
  | string;

type Props = {
  repo: `${string}/${string}`;
  repoId: string;
  category?: string;
  categoryId?: string;
  mapping?: Mapping;
  term?: string; // mapping='specific'일 때
  strict?: Bool01;
  lang?: string;
  // follow: 앱 테마에 따라 전환, lock: Giscus가 시스템 선호도에 따름
  themeMode?: "follow" | "lock";
  darkTheme?: Exclude<ThemeName, "light">;
  reactionsEnabled?: Bool01;
  emitMetadata?: Bool01;
  inputPosition?: "top" | "bottom";
};

export default function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  term,
  strict = "0",
  lang = "ko",
  themeMode = "follow",
  darkTheme = "transparent_dark",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "bottom",
}: Props) {
  // Guard against misconfiguration
  if (!repo || !repoId) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[Giscus] repo/repoId가 설정되지 않았습니다.");
    }
    return null;
  }

  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // Decide theme per mode
  const theme: ThemeName =
    themeMode === "lock"
      ? "preferred_color_scheme"
      : resolvedTheme === "dark"
      ? darkTheme
      : "light";

  // Stable key to remount on route/theme changes based on actual theme string
  const key = useMemo(
    () => `${mapping}-${term ?? pathname}-${theme}`,
    [mapping, term, pathname, theme]
  );

  return (
    <div id="comments" aria-label="댓글">
      <Giscus
        key={key}
        id="giscus-comments"
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        term={term}
        strict={strict}
        reactionsEnabled={reactionsEnabled}
        emitMetadata={emitMetadata}
        inputPosition={inputPosition}
        theme={theme}
        lang={lang}
        loading="lazy"
      />
    </div>
  );
}
