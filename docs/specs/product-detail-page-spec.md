# Product Detail Page Spec

## Goal

Build a dedicated product detail page at `/catalogo/[id]` that lets shoppers read the full product description, browse a multi-image gallery, and add the item to the cart — all without a backend.

## Background

Odara's catalog currently shows only a compact card for each product. There is no way for a shopper to read a longer description or see more than one image before deciding to buy. This forces the store owner to communicate all product detail over WhatsApp after the cart message is sent, adding friction to every sale. A dedicated detail page gives each product room to tell its story, reduces pre-purchase questions, and increases buyer confidence. Two new Supabase columns (`description` and `images`) will store the additional content that feeds this page.

## Requirements

### Must

1. Must render the product detail page at the URL `/catalogo/[id]`, where `[id]` matches the product's Supabase row id.
2. Must display the product name on the detail page.
3. Must display the product price on the detail page.
4. Must display the product badge (if present) on the detail page.
5. Must display the product category on the detail page.
6. Must display the product description text on the detail page; the description is sourced from a new `description` (text) column added to the Supabase `products` table.
7. Must render an image gallery that sources its images from a new `images` (text[]) column added to the Supabase `products` table.
8. Must lay out the image gallery on desktop as a vertical thumbnail strip on the left side with the currently active image displayed large on the right side.
9. Must switch the active (large) image when the user hovers over a thumbnail — no click required; the hover state persists until another thumbnail is hovered.
10. Must render a breadcrumb navigation row showing "Home > Catálogo > [Product Name]" above the product detail content.
11. Must make each breadcrumb segment ("Home" and "Catálogo") a navigable link to its respective page.
12. Must render an "Adicionar ao carrinho" button on the detail page that adds exactly one unit of the product to the cart, using behavior identical to the add button on the catalog card.
13. Must render a "Related Products" section at the bottom of the detail page showing approximately 3 products fetched randomly from Supabase, excluding the current product.
14. Must make each related product card navigable — clicking a related product card body navigates to that product's own detail page at `/catalogo/[related-id]`.
15. Must make clicking the body of a product card in the catalog (not the "Adicionar" button) navigate the user to `/catalogo/[id]`.
16. Must include per-page SEO metadata: the `<title>` must be the product name, the meta description must use the product description text, and the `og:image` must use the first URL in the `images` array; when the `images` array is empty or null the `og:image` must fall back to the Odara logo.
17. Must render a social sharing button that triggers the browser's native Web Share API with the current product page URL; on browsers that do not support the Web Share API the button must fall back to copying the URL to the clipboard.
18. Must ensure all user-facing strings are in Brazilian Portuguese (pt-BR).
19. Must use only Design System color tokens — no hardcoded color values anywhere on the detail page.

### Should

20. Should adapt the image gallery layout on mobile so that the thumbnail strip and the main image stack vertically or the thumbnails are displayed in a horizontal scrollable row below the main image, ensuring no horizontal overflow of the page.
21. Should adapt the breadcrumb on mobile by condensing it (for example, showing only the parent "Catálogo" link and the current product name, or truncating long product names) so it does not cause horizontal overflow on narrow screens.
22. Should show a loading or skeleton state while product data is being fetched from Supabase.
23. Should display a human-readable "Produto não encontrado" message and a link back to `/catalogo` when the requested `[id]` does not match any product in Supabase.
24. Should constrain the page content width to the Design System's `var(--container-max)` (1200 px) with standard fluid horizontal padding.

### Must Not

25. Must not implement image zoom, lightbox, or fullscreen view for gallery images.
26. Must not render a quantity selector on the detail page — the "Adicionar ao carrinho" button always adds exactly one unit per click.
27. Must not render a favorites or wishlist button anywhere on the detail page.
28. Must not expose a write path to the Supabase `products` table — this page is strictly read-only.
29. Must not change the cart data structure, the cart context logic, or the WhatsApp message format.

## Out of Scope

- **New Supabase columns migration UI**: the `description` and `images` columns must be created directly in the Supabase dashboard by the store owner; there is no migration script or admin interface in this spec.
- **Image upload or management**: there is no UI for uploading product images. The `images` column stores externally hosted URLs managed by the store owner outside this app.
- **Quantity selector**: adding more than one unit at a time from the detail page is not supported in this delivery.
- **Favorites / wishlist**: saving a product for later is not supported; Odara has no user accounts or persistent user state beyond the ephemeral client-side cart.
- **Reviews or ratings on the detail page**: customer feedback is managed by the separate Feedback Carousel feature on the home page; it does not appear on the product detail page.
- **Admin / CMS interface**: there is no page, drawer, or form for the store owner to edit product descriptions or images inside the app.
- **Pagination or filtering on the Related Products section**: the section shows a static random sample of approximately 3 products with no controls.
- **Deep-linked image state**: the URL does not encode which gallery image is active; refreshing the page always shows the first image as active.

## WhatsApp Handoff

No changes to the WhatsApp handoff. The "Adicionar ao carrinho" button on the detail page adds one unit to the existing ephemeral cart using the same cart context as the catalog card. The WhatsApp message format in `lib/whatsapp.ts`, the cart data structure in `lib/cart.ts`, and the CartContext are all unchanged by this feature.

## Design System Notes

**Existing DS components and tokens that apply directly:**

- `ProductCard` (`../Odara Design System/Components/commerce/ProductCard`) — used as-is for the Related Products section cards; card body click must navigate to the detail page.
- `PriceTag` (`../Odara Design System/Components/commerce/PriceTag`) — used for the product price on the detail page.
- `SectionHead` (`app/components/home/ProductSections/SectionHead.tsx`) — used for the "Produtos Relacionados" section heading at the bottom of the page.
- `IconButton` (`app/components/core/IconButton/IconButton.tsx`) — candidate for the social sharing trigger button.
- Motion tokens `--dur-med` (240 ms), `--dur-fast` (140 ms), `--ease-out` — must govern thumbnail hover transitions and any interactive state changes.
- Shadow tokens `--shadow-sm` / `--shadow-md` — rest and hover elevation on the main image or gallery frame if styled as a card surface.
- Radius token `--radius-lg` (18 px) — image gallery container and related product cards.
- Color tokens `--surface-sunken`, `--surface-card`, `--border-soft`, `--ink-900`, `--ink-700`, `--ink-500`, `--gold-500`, `--cream-100`.
- Typography tokens `--font-serif` (Cormorant Garamond) for the product name heading, `--font-sans` (Jost) for description body text, price, and breadcrumb.

**New visual patterns with no existing DS component (require new implementation):**

- **Image Gallery** — a new layout component with a vertical left thumbnail strip and a large right main image. Hover on a thumbnail updates the active image. On mobile this layout must reflow (thumbnails below or beside the main image in a scrollable row). No DS equivalent exists.
- **Breadcrumb** — a navigation element showing the page hierarchy. Must use Design System ink and gold tokens for link colors and separators. No DS equivalent exists; must be implemented with direct token usage.
- **Social Sharing button** — a UI element that invokes the browser's native Web Share API with the product URL; falls back to clipboard copy on unsupported browsers. Must use Design System tokens. No DS equivalent exists.
- **Product Detail layout** — a two-column desktop layout (gallery left, product info right) that collapses to a single-column stack on mobile. No DS equivalent exists; must be built with Tailwind and Design System spacing tokens.

## Success Criteria

- `npm run build` inside `odara/` passes with zero new TypeScript errors and zero new ESLint errors.
- On desktop (1280 px viewport): clicking a product card body in `/catalogo` navigates to `/catalogo/[id]`; the "Adicionar" button on the card does not navigate.
- On desktop (1280 px viewport): the detail page renders the product name, price, badge, category, description, breadcrumb, gallery, "Adicionar ao carrinho" button, and Related Products section without any layout overflow.
- On desktop (1280 px viewport): the image gallery shows the vertical thumbnail strip on the left and the active image on the right; hovering a thumbnail immediately switches the main image without a click.
- On mobile (375 px viewport): the entire detail page renders without horizontal scroll; the gallery, breadcrumb, and Related Products section all adapt to a single-column layout.
- Navigating to `/catalogo/[id-inexistente]` shows a "Produto não encontrado" message and a link to `/catalogo`.
- The `<title>` tag of the detail page equals the product name; `og:image` equals the first URL in the `images` array.
- Clicking "Adicionar ao carrinho" on the detail page adds exactly one unit to the cart, identical to the catalog card behavior; the cart count in the header increments by 1.
- Clicking a Related Products card body navigates to that product's own `/catalogo/[id]` page.
- All text on the page is in Brazilian Portuguese (pt-BR).
- The page uses no inline color values — all colors reference CSS custom properties from the Design System token files.

## Open Questions

None. All questions resolved during spec interview:
- **`og:image` fallback** → Odara logo (resolved).
- **Social sharing target** → browser native Web Share API, clipboard fallback (resolved).
- **Related Products seeding** → exclude the current product only (resolved).
