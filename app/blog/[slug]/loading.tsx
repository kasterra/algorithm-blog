import { ScaleLoader } from "react-spinners";

export default function BlogPostLoading() {
  return (
    <div className="h-[70vh] grid place-items-center">
      <div className="flex flex-col items-center gap-4" aria-busy>
        <ScaleLoader />
        <p className="text-sm text-muted-foreground">게시글을 불러오는 중...</p>
      </div>
    </div>
  );
}
