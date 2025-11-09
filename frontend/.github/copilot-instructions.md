## Quick orientation for AI coding agents

This repository is a Vite + React + TypeScript single-page app scaffolded with shadcn-ui and Tailwind. The goal of this file is to give an agent the exact, discoverable facts needed to be productive quickly.

Key facts
- Entry point: `src/main.tsx` → mounts `App` (`src/App.tsx`). See router and QueryClient setup in `src/App.tsx`.
- Dev server: run `npm run dev` (Vite). The configured server listens on port 8080 (`vite.config.ts`) and exposes an alias `@` → `src`.
- Build: `npm run build`; preview: `npm run preview`.

Architecture & patterns
- UI primitives live under `src/components/ui/` (button.tsx, input.tsx, toaster, etc.). These are reused across features — follow their naming and prop patterns when adding new primitives.
- Feature components are grouped by area under `src/components/` and pages under `src/pages/`. Example: admin pages are in `src/pages/admin` and dashboard widgets under `src/components/dashboard`.
- Routing: React Router is configured in `src/App.tsx`. Add new top-level routes there and place pages under `src/pages`.
- State & data fetching: the project uses @tanstack/react-query (see `src/App.tsx` where QueryClientProvider is created). Prefer using react-query hooks (useQuery/useMutation) for server interactions.

Integrations & data layer
- Supabase client (auto-generated): `src/integrations/supabase/client.ts`. DO NOT edit generated files in `src/integrations/supabase/*` — they are generated from the Supabase schema/types. Import the client as:

  import { supabase } from "@/integrations/supabase/client";

- Environment variables used by Supabase: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (also see legacy/other usages like `VITE_SUPABASE_ANON_KEY` in some helper files). Defaults or examples can appear in `src/lib/supabase.ts` but prefer the generated client under `src/integrations`.
- Database migrations and config live in the `supabase/` folder (migrations + config.toml). Treat these as authoritative for DB schema.

Conventions to follow
- File/alias: use `@/` to reference files in `src` (alias configured in `vite.config.ts`).
- Component placement: UI primitives -> `components/ui/`; feature-specific components -> `components/<feature>/`; pages -> `pages/`.
- Generated code: do not modify files under `src/integrations/supabase/` or any other auto-generated directories.
- Localization/route names: the project uses Turkish slugs for public routes (e.g., `/hizmetler`, `/hakkimizda`). Keep existing slugs when adding pages unless instructed otherwise.

Examples (concrete, copyable)
- Importing the supabase client (used across admin pages):

  import { supabase } from "@/integrations/supabase/client";

- Entry point and app mount:

  // src/main.tsx
  import App from "./App"; // App sets up QueryClientProvider + Router

Quality gates & developer workflows
- To run locally: `npm i` then `npm run dev`. The dev server runs on port 8080 (see `vite.config.ts`).
- Linting: `npm run lint` (ESLint). There are no test scripts configured in package.json.
- When changing database schema, update `supabase/migrations` using the Supabase CLI and regenerate `src/integrations/supabase` client/types.

If something is unclear or missing
- Tell me which feature/file you want to change and I will (a) locate related components and routes, (b) propose minimal edits, and (c) run a quick lint/build check.

Short checklist for common tasks
- Add a page: create `src/pages/MyPage.tsx`, register route in `src/App.tsx`, add UI under `src/components/<feature>`.
- Add a Supabase-backed query: use the generated client in `src/integrations/supabase/client.ts`, wrap requests with react-query hooks.
- Add a UI primitive: add new file under `src/components/ui/` and mirror the naming/props of existing primitives.

Files to inspect first
- `src/App.tsx` (routing + QueryClient)
- `src/main.tsx` (mount)
- `vite.config.ts` (dev server + alias)
- `package.json` (scripts)
- `src/integrations/supabase/` (generated client + types)
- `supabase/migrations/` (DB changes)

Please review this and tell me if you want more examples (small code patches) or a stricter rule set for new components.
