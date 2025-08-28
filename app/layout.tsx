import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Noto_Sans_KR, Noto_Serif_KR, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  // Use common text weights to limit payload
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-kr",
});

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-kr",
});

export const metadata: Metadata = {
  title: "Kasterra's PS",
  description: "Kasterra의 PS 기록을 담은 곳 입니다",
  generator: "v0.app",
};

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-fira-code",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-mono: ${firaCode.style.fontFamily}, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-serif: ${notoSerifKr.variable};
}

:root {
  --kr-sans-stack: "Noto Sans KR", "Apple SD Gothic Neo", "Helvetica Neue", Arial, sans-serif;
  --kr-serif-stack: "Noto Serif KR", "Apple SD Gothic Neo", "Noto Sans KR", Georgia, serif;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:lang(ko) {
  font-family: ${notoSansKr.style.fontFamily}, var(--kr-sans-stack);
}

:lang(ko) .kr-serif {
  font-family: ${notoSerifKr.style.fontFamily}, var(--kr-serif-stack);
}

:lang(ko) h1,
:lang(ko) h2,
:lang(ko) h3,
:lang(ko) h4,
:lang(ko) h5,
:lang(ko) h6 {
  font-family: ${notoSansKr.style.fontFamily}, var(--kr-sans-stack);
}
        `}</style>
      </head>
      <body
        className={`${notoSerifKr.variable} ${notoSansKr.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
