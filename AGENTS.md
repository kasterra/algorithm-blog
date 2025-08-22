# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and server/client components (e.g., `app/page.tsx`, `app/api/*`).
- `components/`: Reusable UI components (PascalCase files, e.g., `Button.tsx`).
- `hooks/`: Custom React hooks (`useSomething.ts`).
- `lib/`: Utilities, data access, and shared logic.
- `styles/`: Global and Tailwind styles (see `styles` + `postcss.config.mjs`).
- `public/`: Static assets served at the site root.
- Config: `next.config.mjs`, `tsconfig.json`, `components.json`.

## Build, Test, and Development Commands
Use pnpm:
- `pnpm dev`: Run the app locally with hot reload.
- `pnpm build`: Production build (`.next/`).
- `pnpm start`: Start the production server (after build).
- `pnpm lint`: Run Next.js/ESLint checks.

Testing is not wired yet. When added, prefer `pnpm test` and document the framework in `package.json`.

## Coding Style & Naming Conventions
- Language: TypeScript (keep types explicit at boundaries).
- Indentation: 2 spaces; avoid mixed tabs/spaces.
- Files: Components in PascalCase (`NavBar.tsx`), hooks in camelCase (`useThing.ts`), route segments in kebab-case (`app/blog/[slug]/page.tsx`).
- Imports: Absolute paths via TS paths if configured; otherwise relative and grouped (external → internal).
- Linting: `pnpm lint` (Next.js + ESLint). Fix issues before PR.

## Testing Guidelines
- Framework: Jest/Vitest + React Testing Library (recommended).
- Location: Co-locate as `Component.test.tsx` or under `__tests__/` mirroring source.
- Coverage: Aim for meaningful coverage on critical logic and components; avoid brittle UI snapshots.
- Run: `pnpm test` (once script is added) and ensure it passes in CI.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits, e.g., `feat(app): add blog listing`, `fix(components): correct button aria`.
- PRs: Provide a clear summary, link issues, add screenshots for UI, list test steps, and confirm `pnpm lint && pnpm build` pass locally.
- Scope small, focused changes. Mark breaking changes explicitly.

## Security & Configuration Tips
- Secrets: Use `.env.local` (never commit). Browser-exposed vars must start with `NEXT_PUBLIC_`.
- Review `next.config.mjs` for redirects/headers. Store static files only in `public/`.
