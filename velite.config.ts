import { defineConfig, s } from "velite";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

// Code Hike 설정: 컴파일 시 하이라이팅(테마는 자유 변경 가능)
const chConfig = {
  components: { code: "CHCode" }, // MDX에서 코드블록을 CHCode 컴포넌트로 보냄
  syntaxHighlighting: { theme: "github-dark" },
} satisfies import("codehike/mdx").CodeHikeConfig;

export default defineConfig({
  // 전역 MDX 옵션 (Velite가 MDX를 컴파일할 때 사용)
  mdx: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    // Velite 문서에 주로 remark/rehype가 등장하지만, Code Hike는 recma도 필요합니다.
    // 최신 Code Hike 문서 기준 API
    // (내부적으로 @mdx-js/mdx 옵션으로 전달되어 동작)
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },

  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s.object({
        title: s.string(),
        date: s.string(),
        // Velite가 컴파일한 MDX 코드(함수 본문 문자열)
        code: s.mdx(),
      }),
    },
  },
  output: {
    data: ".velite", // 기본값 사용 가능
  },
});
