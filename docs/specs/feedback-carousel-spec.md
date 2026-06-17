# Feedback Carousel Spec

## Goal

Add a "Depoimentos" (testimonials) section to the home page that displays customer feedback cards fetched from Supabase in a horizontal carousel on desktop and a stacked vertical list on mobile.

## Background

Prospective buyers of handcrafted gifts rely heavily on social proof before committing to a purchase. Odara currently shows only product and value information on the home page, with no customer voices. A testimonials section immediately below the featured "Queridinhos" products section lets the store owner curate high-quality reviews (via the `featured` flag in the `feedbacks` table) and display them in an on-brand, visually warm way. The carousel format keeps the section compact on desktop while remaining fully readable on mobile without horizontal scrolling.

## Requirements

### Must

1. Must render a new `<section>` on the home page (`app/page.tsx`) placed immediately after the `<ProductSections />` component and before the WhatsApp CTA band.
2. Must fetch only rows where `featured = true` from the Supabase `feedbacks` table using a client-side hook named `useFeaturedFeedbacks`, mirroring the pattern of `useFeaturedProducts`.
3. Must implement `useFeaturedFeedbacks` using the Supabase browser client from `lib/supabase.ts` — no server-side fetch, no `lib/queries.ts` involvement, and no `@/utils/supabase/server` import.
4. Must have `useFeaturedFeedbacks` query the `feedbacks` table, filter by `featured = true`, and order results by `created_at` ascending.
5. Must define a `Feedback` TypeScript interface in `lib/data.ts` that maps the `feedbacks` table columns: `id` (string), `product_id` (string | null), `name` (string), `description` (string), `image_url` (string | null), `featured` (boolean), `created_at` (string).
6. Must render one `FeedbackCard` per row returned; each card must display the reviewer's `name`, the `description` text, and — when `image_url` is not null — the reviewer's photo.
7. Must display a section heading using the existing `SectionHead` component with eyebrow text "O que dizem por aí", title "Depoimentos", and no subtitle.
8. Must implement a `FeedbackCarousel` Client Component that, on screens `md` (768 px) and wider, shows exactly 4 cards simultaneously and advances by 1 card per click on the navigation arrows when 4 or more featured feedbacks are returned; when fewer than 4 featured feedbacks are returned, must fall back to a simple flex row with no arrow controls and no sliding behaviour.
9. Must implement smooth slide transition between carousel positions using CSS `transition` with `var(--dur-med)` (240 ms) and `var(--ease-out)` easing, matching the motion tokens used elsewhere in the project.
10. Must render previous and next navigation arrow buttons using the existing `IconButton` component with `variant="ghost"`.
11. Must hide the previous arrow when the carousel is at the first position.
12. Must hide the next arrow when the carousel is at the last position (i.e., when the last card is fully visible).
13. Must display the cards in a single-column stacked layout on screens narrower than `md` (below 768 px) — no horizontal carousel on mobile.
14. Must not render the section at all when `useFeaturedFeedbacks` returns an empty array.
15. Must use only Design System color tokens (`--surface-sunken`, `--surface-card`, `--border-soft`, `--ink-900`, `--ink-700`, `--ink-500`, `--gold-500`, etc.) — no hardcoded color values.
16. Must use `var(--radius-lg)` for `FeedbackCard` corner radius, matching `ProductCard`.
17. Must use `var(--shadow-sm)` at rest and `var(--shadow-md)` on hover for `FeedbackCard`, matching `ProductCard` elevation behaviour.
18. Must use `font-serif` (Cormorant Garamond) for the reviewer `name` and `font-sans` (Jost) for the `description` body text, consistent with the Design System typography roles.
19. Must display a placeholder avatar (cream gradient circle with a Lucide `user` icon in `--gold-400`) when `image_url` is null.
20. Must wrap the section background in `bg-surface-sunken` to alternate visually with the white `ProductSections` sections above and below it.
21. Must ensure all user-facing strings are in Brazilian Portuguese (pt-BR).

### Should

22. Should display a decorative quotation mark (`"`) above the `description` text in each card, rendered in `--gold-200` at a large display size, to reinforce the testimonial visual metaphor.
23. Should show a loading skeleton (pulsing cream rectangles matching the card dimensions) while the client hook is loading data — the `FeedbackCarousel` component must handle the loading state returned by `useFeaturedFeedbacks`.
24. Should gap cards at `24px` horizontally on desktop and `16px` vertically on mobile, consistent with spacing used in `ProductSections`.
25. Should constrain the section's inner content to `var(--container-max)` (1200 px) and apply the standard fluid horizontal padding `clamp(16px, 4vw, 48px)`.
26. Should apply `var(--dur-med)` hover lift (`translateY(-3px)`) to each `FeedbackCard`, matching the `ProductCard` interaction style.

### Must Not

27. Must not import or reference any `ProductCard` props (`price`, `original`, `onAdd`, `badge`) in the `FeedbackCard` component — feedback cards do not represent purchasable items.
28. Must not expose a write path to the `feedbacks` table — this feature is read-only.
29. Must not implement pagination, filtering, or search on the testimonials section — the carousel consumes only the curated `featured` rows.
30. Must not add a horizontal scrollbar on any viewport width — the mobile layout must be strictly vertical, and the desktop carousel must clip overflow without allowing scroll.
31. Must not use any third-party carousel library — the carousel must be implemented with native React state and CSS transforms only.

## Out of Scope

- **Admin / CMS interface**: there is no UI for adding, editing, or deleting feedback rows. The store owner manages the `feedbacks` table directly in the Supabase dashboard.
- **Star ratings**: the spec does not include a numerical or star-based rating field. The `feedbacks` table has no such column.
- **Product linkage display**: although `feedbacks.product_id` references the `products` table, this spec does not display the linked product name, image, or price inside the feedback card.
- **Pagination of non-featured feedbacks**: there is no "ver todos os depoimentos" page or drawer.
- **Animated auto-play**: the carousel does not advance automatically — it is user-driven only.
- **Swipe / touch gesture support**: mobile renders a vertical list, eliminating the need for swipe navigation.
- **Deep-link or anchor scrolling to a specific testimonial**: no URL-based carousel state.

## WhatsApp Handoff

No changes to the WhatsApp handoff. This feature does not touch the cart, the cart context, or the WhatsApp message builder in `lib/whatsapp.ts`.

## Design System Notes

**Existing DS components and tokens that apply directly:**

- `SectionHead` (`app/components/home/ProductSections/SectionHead.tsx`) — used as-is for the section heading with eyebrow + title + Divider.
- `IconButton` (`app/components/core/IconButton/IconButton.tsx`) — used for the previous/next carousel navigation buttons with `variant="ghost"`.
- `Eyebrow` and `Divider` — already consumed by `SectionHead`; no direct use required.
- Motion tokens `--dur-med` (240 ms), `--dur-fast` (140 ms), `--ease-out` — must govern all transitions.
- Shadow tokens `--shadow-sm` / `--shadow-md` — rest and hover states of `FeedbackCard`.
- Radius token `--radius-lg` (18 px) — card corners.
- Color tokens `--surface-sunken`, `--surface-card`, `--border-soft`, `--ink-900`, `--ink-700`, `--ink-500`, `--gold-200`, `--gold-400`, `--gold-500`, `--cream-100`, `--cream-300`.
- Typography tokens `--font-serif`, `--font-sans`, `--text-xl` (name), `--text-md` / `--text-sm` (description), `--text-2xs` + `--tracking-caps` (eyebrow inside SectionHead).

**New visual patterns with no existing DS component (require new implementation):**

- `FeedbackCard` — a new card variant. Taller than `ProductCard` due to multi-line testimonial text. Shares structural DNA with `ProductCard` (same surface, radius, shadow, and hover lift) but its content area contains: reviewer avatar (circular, 48 px), reviewer name in serif, decorative quote mark, and description in sans body text. No price, no CTA button, no badge. This is a new component with no DS equivalent.
- `FeedbackCarousel` — a new Client Component that consumes the `useFeaturedFeedbacks` hook. On desktop with 4 or more items, it wraps a horizontal clipped track using native React `useState` for the active index, CSS `transform: translateX(...)` for the slide position, and `overflow-hidden` on the track container. On desktop with fewer than 4 items, it renders a simple flex row with no arrows and no transform logic. No DS equivalent exists.

## Success Criteria

- `npm run build` inside `odara/` passes with zero new TypeScript errors and zero new ESLint errors.
- On desktop (1280 px viewport): the Depoimentos section is visible below the "Os queridinhos" section and above the emerald CTA band; exactly 4 feedback cards are visible simultaneously; clicking the next arrow advances by exactly 1 card; the next arrow disappears when the last card is fully in view; the previous arrow disappears at the first position.
- On mobile (375 px viewport): the Depoimentos section renders as a vertical stack of cards with no horizontal scrollbar and no carousel controls.
- When `useFeaturedFeedbacks` returns an empty array, the Depoimentos section is absent from the DOM entirely — no heading, no empty carousel track.
- When `useFeaturedFeedbacks` returns fewer than 4 items, the section renders as a simple flex row on desktop with no arrow buttons and no slide animation.
- A feedback row with `image_url = null` renders the cream-gradient circle placeholder with the Lucide `user` icon — no broken image element.
- Card hover on desktop produces a `translateY(-3px)` lift and the `--shadow-md` shadow, consistent with `ProductCard`.
- The slide transition between carousel positions is visibly animated (240 ms, ease-out) — not an instant cut.
- All text in the section is in Brazilian Portuguese (pt-BR).
- The section uses no inline color values — all colours reference CSS custom properties from the Design System token files.
