# Product Detail Page Plan

## Summary
- **Spec:** `odara/docs/specs/product-detail-page-spec.md`
- **Total tasks:** 15
- **Agent:** frontend-agent

## Tasks

### Task 1 — Extend the Product interface with new optional fields
- **Agent:** frontend-agent
- **Covers:** Must 6, Must 7
- **Description:** Add two new optional fields — a text description and an array of image URLs — to the existing Product type definition in the data layer. This is the prerequisite that unlocks all downstream type-safe usage of these fields.
- **Depends on:** none
- **Commit:** "feat: extend Product interface with description and images fields"

### Task 2 — Add fetch function for a single product by id
- **Agent:** frontend-agent
- **Covers:** Must 1, Must 2, Must 3, Must 4, Must 5, Must 6, Must 7
- **Description:** Implement a server-side data-layer function that queries Supabase for a single product row by its id, returning all fields including the new description and images columns.
- **Depends on:** Task 1
- **Commit:** "feat: add getProductById fetch function"

### Task 3 — Add fetch function for related products
- **Agent:** frontend-agent
- **Covers:** Must 13
- **Description:** Implement a server-side data-layer function that retrieves approximately three random products from Supabase, excluding a given product id, to power the Related Products section.
- **Depends on:** Task 1
- **Commit:** "feat: add getRelatedProducts fetch function"

### Task 4 — Make catalog product card bodies navigable to the detail page
- **Agent:** frontend-agent
- **Covers:** Must 15
- **Description:** Update the existing catalog page so that clicking the body of a product card navigates to that product's detail page, while leaving the "Adicionar" button behaviour unchanged (it must not trigger navigation).
- **Depends on:** none
- **Commit:** "feat: make catalog card body navigate to product detail page"

### Task 5 — Create the product detail page route and server shell
- **Agent:** frontend-agent
- **Covers:** Must 1, Must 18, Should 23, Should 24
- **Description:** Create the dynamic route segment at `/catalogo/[id]` as a Server Component page. The shell must fetch the product by id, render a "Produto não encontrado" message with a back link when the id is not found, constrain content to the Design System maximum container width, and ensure all user-facing strings are in Brazilian Portuguese.
- **Depends on:** Task 2
- **Commit:** "feat: add /catalogo/[id] page route with not-found handling"

### Task 6 — Add SEO metadata generation to the detail page
- **Agent:** frontend-agent
- **Covers:** Must 16
- **Description:** Wire up Next.js `generateMetadata` on the detail page so that the tab title equals the product name, the meta description uses the product description text, and the Open Graph image points to the first image URL in the array (falling back to the Odara logo when the array is absent or empty).
- **Depends on:** Task 5
- **Commit:** "feat: add generateMetadata with og:image fallback to detail page"

### Task 7 — Build the breadcrumb Server Component
- **Agent:** frontend-agent
- **Covers:** Must 10, Must 11, Must 19, Should 21
- **Description:** Build a reusable Server Component that renders a "Home > Catálogo > [Product Name]" breadcrumb trail, with the Home and Catálogo segments as navigable links. The component must use only Design System color and typography tokens, and must adapt on narrow viewports to prevent horizontal overflow (condensing or truncating as needed).
- **Depends on:** Task 5
- **Commit:** "feat: add Breadcrumb Server Component for detail page"

### Task 8 — Build the image gallery Client Component
- **Agent:** frontend-agent
- **Covers:** Must 7, Must 8, Must 9, Must 19, Should 20
- **Description:** Build a 'use client' image gallery component that displays a vertical thumbnail strip on the left and a large active image on the right on desktop. Hovering a thumbnail immediately switches the main image using React state; no click is required. On mobile the layout reflows to a single-column stack or a horizontal scrollable thumbnail row below the main image, with no horizontal page overflow. All transitions must follow Design System motion and shadow tokens. Image zoom, lightbox, and fullscreen are explicitly excluded.
- **Depends on:** Task 1
- **Commit:** "feat: add ImageGallery client component with hover-to-switch thumbnails"

### Task 9 — Build the social sharing Client Component
- **Agent:** frontend-agent
- **Covers:** Must 17, Must 19
- **Description:** Build a 'use client' social sharing button that invokes the browser's native Web Share API with the current product page URL. On browsers that do not support the API, it falls back to copying the URL to the clipboard. The button must be styled exclusively with Design System tokens and must display a user-facing label in Brazilian Portuguese.
- **Depends on:** none
- **Commit:** "feat: add SocialShareButton client component with clipboard fallback"

### Task 10 — Compose the product detail layout with product information
- **Agent:** frontend-agent
- **Covers:** Must 2, Must 3, Must 4, Must 5, Must 6, Must 12, Must 18, Must 19, Should 24
- **Description:** Assemble the two-column desktop layout for the detail page (gallery on the left, product information on the right), integrating the image gallery, product name, price, badge, category, description, and the "Adicionar ao carrinho" button. The button must add exactly one unit to the cart, mirroring the catalog card behaviour. No quantity selector and no wishlist button are rendered. The layout collapses to a single column on mobile. All styling must use Design System tokens exclusively.
- **Depends on:** Task 5, Task 7, Task 8, Task 9
- **Commit:** "feat: compose product detail layout with info panel and add-to-cart"

### Task 11 — Build the Related Products section
- **Agent:** frontend-agent
- **Covers:** Must 13, Must 14, Must 19, Should 24
- **Description:** Add a Related Products section at the bottom of the detail page that fetches approximately three random products (excluding the current product) and renders them using the existing ProductCard component. Each card body must link to that product's own detail page; the "Adicionar" button on each card must not trigger navigation. The section heading must follow the existing SectionHead pattern and all strings must be in Brazilian Portuguese.
- **Depends on:** Task 3, Task 10
- **Commit:** "feat: add Related Products section to detail page"

### Task 12 — Add loading skeleton for the detail page
- **Agent:** frontend-agent
- **Covers:** Should 22
- **Description:** Implement a loading state or skeleton UI for the detail page that displays while product data is being fetched from Supabase, preventing a blank flash during server-side data loading.
- **Depends on:** Task 10
- **Commit:** "feat: add loading skeleton for product detail page"

### Task 13 — Verify Design System token coverage across detail page components
- **Agent:** frontend-agent
- **Covers:** Must 19
- **Description:** Audit every new component built in this feature to confirm that no hardcoded color values remain and that all colors, typography, spacing, shadow, and motion values reference Design System CSS custom properties. Fix any violations found.
- **Depends on:** Task 11, Task 12
- **Commit:** "style: enforce Design System token usage across detail page components"

### Task 14 — Verify pt-BR string coverage across all new components
- **Agent:** frontend-agent
- **Covers:** Must 18
- **Description:** Review all user-facing text in every new component and page produced by this feature to confirm that every label, heading, error message, button, and fallback string is in Brazilian Portuguese. Fix any English-language strings found.
- **Depends on:** Task 13
- **Commit:** "style: ensure all user-facing strings are in pt-BR on detail page"

### Task 15 — Build verification and lint pass
- **Agent:** frontend-agent
- **Covers:** Must 1, Must 28, Must 29
- **Description:** Run the production build and linter inside the Next.js project to confirm zero new TypeScript errors and zero new ESLint errors. Resolve any type or lint issues introduced by this feature, confirming that no write paths to Supabase were added and that the cart data structure, cart context, and WhatsApp message format remain unchanged.
- **Depends on:** Task 14
- **Commit:** "chore: fix build and lint errors for product detail page feature"
