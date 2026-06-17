# Feedback Carousel Plan

## Summary
- **Spec:** `odara/docs/specs/feedback-carousel-spec.md`
- **Total tasks:** 5
- **Agent:** frontend-agent

## Tasks

### Task 1 — Feedback type and data hook
- **Agent:** frontend-agent
- **Covers:** Must 2, Must 3, Must 4, Must 5
- **Description:** Define the `Feedback` TypeScript interface mapping all `feedbacks` table columns, and implement the `useFeaturedFeedbacks` client-side hook alongside the existing `useFeaturedProducts` hook, using the Supabase browser client, filtering by `featured = true`, and ordering by `created_at` ascending. Export the hook from the hooks barrel file.
- **Depends on:** none
- **Commit:** "feat: add Feedback type and useFeaturedFeedbacks hook"

### Task 2 — FeedbackCard component
- **Agent:** frontend-agent
- **Covers:** Must 6, Must 15, Must 16, Must 17, Must 18, Must 19, Must Not 27, Should 22, Should 24, Should 26
- **Description:** Create the `FeedbackCard` Client Component that receives a `Feedback` value and renders the reviewer's circular avatar (with a placeholder gradient circle and Lucide user icon when no photo URL is present), the reviewer's name in serif typography, a decorative large quotation mark in `--gold-200`, and the testimonial description in sans body text — all styled exclusively with Design System color, radius, shadow, and motion tokens. The card must apply a hover lift and shadow transition matching `ProductCard` behaviour.
- **Depends on:** Task 1
- **Commit:** "feat: add FeedbackCard component"

### Task 3 — FeedbackCarousel component
- **Agent:** frontend-agent
- **Covers:** Must 8, Must 9, Must 10, Must 11, Must 12, Must 13, Must 14, Must Not 30, Must Not 31, Should 23, Should 24, Should 25
- **Description:** Create the `FeedbackCarousel` Client Component that consumes `useFeaturedFeedbacks` and renders a loading skeleton while data is in flight. When the hook returns an empty array, the component renders nothing. When fewer than 4 items are returned, it renders a simple flex row with no arrow controls. With 4 or more items on `md`-and-wider screens it renders a clipped horizontal track with `transform: translateX` slide transitions driven by native React state, using `IconButton variant="ghost"` for the previous and next arrows — hiding the previous arrow at the first position and the next arrow at the last visible position. On narrower screens all items render as a vertical stack with no horizontal overflow and no controls.
- **Depends on:** Task 1, Task 2
- **Commit:** "feat: add FeedbackCarousel component"

### Task 4 — Section heading integration
- **Agent:** frontend-agent
- **Covers:** Must 7, Must 20, Must 21, Should 25
- **Description:** Compose the Depoimentos section wrapper that houses the `SectionHead` component configured with the eyebrow text "O que dizem por aí" and title "Depoimentos" (no subtitle), and wraps the `FeedbackCarousel`. Apply the `--surface-sunken` section background and constrain the inner content to the standard container max-width with fluid horizontal padding.
- **Depends on:** Task 3
- **Commit:** "feat: add Depoimentos section with SectionHead"

### Task 5 — Home page section placement
- **Agent:** frontend-agent
- **Covers:** Must 1
- **Description:** Add the new Depoimentos section to the home page Server Component, positioned immediately after `<ProductSections />` and before the WhatsApp CTA band, without converting the home page to a Client Component.
- **Depends on:** Task 4
- **Commit:** "feat: add Depoimentos section to home page"
