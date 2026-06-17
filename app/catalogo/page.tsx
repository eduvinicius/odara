import type { Metadata } from "next";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Eyebrow } from "@/app/components/core/Eyebrow";
import { Pagination } from "@/app/components/ui/Pagination";
import { CatalogFilters } from "./CatalogFilters";
import { CatalogGrid } from "./CatalogGrid";
import { getProductsPaginated, getCategories } from "@/lib/queries";
import { type Category } from "@/lib/data";
import { wrap } from "./page.data";

export const metadata: Metadata = {
  title: "Catálogo — Odara",
  description: "Explore nossa coleção de presentes artesanais. Busque por nome ou filtre por categoria.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

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

  // Fetch categories and products in parallel. rawCat is passed directly to
  // getProductsPaginated — getCategories() validates it afterwards. An unknown
  // rawCat will simply not match any category_id in Supabase (returns 0 rows),
  // and the UI falls back to showing "Todos" as the active chip.
  const [categoryLabels, { products, totalCount, totalPages }] = await Promise.all([
    getCategories(),
    getProductsPaginated(page, rawCat, q),
  ]);

  const allCategories: Category[] = ["Todos", ...categoryLabels];
  const cat: Category = allCategories.includes(rawCat) ? rawCat : "Todos";

  // Build preserved params for pagination links (omit `page` — Pagination adds it)
  const preservedParams: Record<string, string> = {};
  if (q) preservedParams.q = q;
  if (cat !== "Todos") preservedParams.cat = cat;

  // Clear-filters href for the empty state
  const clearHref = "/catalogo";

  return (
    <>
      <Header />

      <main className="bg-surface-page">
        {/* Page header */}
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

        {/* Product grid */}
        <section
          style={{
            ...wrap,
            padding: "clamp(28px,4vw,44px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)",
          }}
        >
          <CatalogGrid
            products={products}
            totalCount={totalCount}
            q={q}
            onClearFilters={clearHref}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/catalogo"
            params={preservedParams}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
