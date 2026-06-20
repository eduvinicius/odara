import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Pagination } from "@/app/components/ui/Pagination";
import { CatalogFilters } from "@/app/components/commerce/CatalogFilters";
import { CatalogGrid } from "@/app/components/commerce/CatalogGrid";
import { getProductsPaginated, getCategories } from "@/lib/queries";
import { wrap } from "./page.data";

export const metadata: Metadata = {
  title: "Catálogo — Odara",
  description: "Explore nossa coleção de presentes artesanais. Busque por nome ou filtre por categoria.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// ─── Skeleton fallback for the product grid ──────────────────────────────────

function CatalogGridSkeleton(): React.ReactElement {
  return (
    <div
      className="grid gap-6 animate-pulse"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={`skeleton-${i}`}
          style={{
            background: "var(--surface-card)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            aspectRatio: "3 / 4",
          }}
        />
      ))}
    </div>
  );
}

// ─── Async server component that fetches + renders the grid ──────────────────

async function CatalogContent({
  page,
  cat,
  q,
}: Readonly<{
  page: number;
  cat: string;
  q: string;
}>): Promise<React.ReactElement> {
  const { products, totalCount, totalPages } = await getProductsPaginated(page, cat, q);

  const clearHref = "/catalogo";

  // Build preserved params for pagination links (omit `page` — Pagination adds it)
  const preservedParams: Record<string, string> = {};
  if (q) preservedParams.q = q;
  if (cat !== "Todos") preservedParams.cat = cat;

  return (
    <>
      <CatalogGrid
        products={products}
        totalCount={totalCount}
        q={q}
        clearFiltersHref={clearHref}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/catalogo"
        params={preservedParams}
      />
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CatalogPage({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  const sp = await searchParams;

  const rawPage = typeof sp.page === "string" ? sp.page : "1";
  const rawCat = typeof sp.cat === "string" ? sp.cat : "Todos";
  const rawQ = typeof sp.q === "string" ? sp.q : "";

  const page = Math.max(1, Number.parseInt(rawPage, 10) || 1);
  const q = rawQ.slice(0, 200); // guard against excessively long input

  // Fetch only categories here so the page header renders immediately.
  // Products are fetched inside CatalogContent behind the Suspense boundary.
  const categoryLabels = await getCategories();

  const allCategories: string[] = ["Todos", ...categoryLabels];
  const cat: string = allCategories.includes(rawCat) ? rawCat : "Todos";

  return (
    <>
      <Header />

      <main className="bg-surface-page">
        {/* Page header — renders immediately while products stream in */}
        <section
          className="border-b border-border-soft"
          style={{ background: "var(--gradient-page)" }}
        >
          <div
            className="flex flex-col items-center gap-3 text-center"
            style={{
              ...wrap,
              padding: "clamp(36px,4vw,56px) clamp(16px,4vw,48px)",
            }}
          >
            <Eyebrow align="center">Catálogo</Eyebrow>
            <h1
              className="font-serif font-semibold text-ink-900"
              style={{ fontSize: "var(--text-4xl)" }}
            >
              Nossos presentes
            </h1>
            <p className="text-ink-500 max-w-115">
              Encontre o presente perfeito — busque pelo nome ou explore por categoria.
            </p>

            {/* Search + category chips — client component */}
            <CatalogFilters q={q} cat={cat} categories={allCategories} />
          </div>
        </section>

        {/* Product grid — streams in behind a Suspense boundary */}
        <section
          style={{
            ...wrap,
            padding: "clamp(28px,4vw,44px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)",
          }}
        >
          <Suspense fallback={<CatalogGridSkeleton />}>
            <CatalogContent page={page} cat={cat} q={q} />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}
