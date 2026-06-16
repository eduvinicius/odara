# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version Warning

@AGENTS.md

This project uses **Next.js 16**, which may have breaking changes from training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint (no auto-fix; add --fix to fix issues)
```

No test runner is configured.

## Architecture

**Odara** is a Brazilian artisanal gift e-commerce catalog. Product data is fetched from Supabase (read-only). The ordering flow ends with a WhatsApp handoff — there is no custom backend, checkout, or user authentication.

### Directory layout

```
odara/              ← Next.js app (this repo)
  app/
    layout.tsx      ← Root layout: Geist fonts, metadata
    page.tsx        ← Home page (currently Next.js placeholder)
    globals.css     ← Tailwind v4 import + CSS custom properties
  lib/
    supabase.ts     ← Supabase browser client init (client components only)
    supabase-server.ts ← Supabase server client init (Server Components — keeps service role key server-side)
    data.ts         ← Supabase fetch functions + Product interface + CATEGORIES
    cart.ts         ← CartItem type (cart state lives in CartContext, persisted to localStorage)
    whatsapp.ts     ← WhatsApp order message builder + phone constant
    utils.ts        ← money() formatter and other pure helpers

../Odara Design System/   ← Brand guidelines & component library (outside this repo)
  Tokens/           ← CSS design tokens (colors, typography, spacing, effects, fonts)
  Components/       ← React primitives (.jsx + .d.ts + .prompt.md per component)
  UI Kits/odara-web/← Full working prototype (Home, Catalog, About, Header, CartDrawer, Footer, data.js)
  Assets/brand/     ← Hero image and wordmark
```

### Key architectural decisions

- **App Router only** — uses Next.js App Directory (`app/`), not Pages Router.
- **Supabase (read-only)** — product data is fetched from Supabase. No writes, no auth. Server Components use a server client initialized with the service role key (`supabase-server.ts`); Client Components use the browser client with the anon key (`supabase.ts`). Config comes from environment variables only.
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss` in `postcss.config.mjs`. The `@theme` directive in `globals.css` is the primary token surface.
- **Path alias** — `@/*` resolves to the project root (set in `tsconfig.json`).
- **Design System as source of truth** — All visual decisions (colors, typography, spacing, components) live in `../Odara Design System/`. When implementing UI, reference that directory rather than inventing styles.

### Brand & language

- Content is in **Brazilian Portuguese (pt-BR)**.
- Tone: warm, artisanal, informal ("você"), first-person plural ("nós").
- Typography: Cormorant Garamond (headings), Jost (UI text), Great Vibes (wordmark only) — all via Google Fonts.
- Color palette: champagne/cream ground · gold primary · emerald secondary · rose accent · warm brown ink.
- Icons: Lucide icon set (thin, rounded stroke).

### Design tokens

The Design System's `Tokens/` folder defines the canonical tokens:

| File | Contents |
|------|----------|
| `colors.css` | Brand palette variables |
| `typography.css` | Font size/weight/line-height scale |
| `spacing.css` | 8px-rhythm spacing scale |
| `effects.css` | Shadows (warm-brown tinted), transitions (140–240 ms, no bounce) |
| `fonts.css` | `@font-face` declarations |

### Commerce components (Design System)

Pre-built components in `../Odara Design System/Components/commerce/`:
- `ProductCard` — product tile with image, name, price, add-to-cart
- `CartLine` — single line item in cart drawer
- `PriceTag` — formatted price display
- `QuantityStepper` — increment/decrement control

Each has a `.prompt.md` usage guide.
