import { ThemeToggle } from "@/components/theme-toggle";

export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-serif text-2xl font-bold">Kasterra's PS</h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
