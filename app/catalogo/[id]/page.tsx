import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Badge } from "@/app/components/core/Badge";
import { PriceTag } from "@/app/components/commerce/PriceTag";
import { ImageGallery } from "@/app/components/commerce/ImageGallery";
import { Breadcrumb } from "@/app/components/ui/Breadcrumb";
import { SocialShareButton } from "@/app/components/ui/SocialShareButton";
import { AddToCartButton } from "./AddToCartButton";
import { RelatedProductsGrid } from "@/app/components/commerce/RelatedProductsGrid";
import { getProductById, getRelatedProducts } from "@/lib/queries";
import { SectionHead } from "@/app/components/home/ProductSections/SectionHead";
import { ScrollToTop } from "./ScrollToTop";
import { wrap } from "../page.data";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (product === null) {
    return {
      title: "Produto não encontrado — Odara",
      description: "",
    };
  }

  const title = `${product.name} — Odara`;
  const description = product.description ?? "";
  const ogImage =
    product.images != null && product.images.length > 0
      ? product.images[0]
      : "/odara-wordmark.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { id } = await params;
  const [product, relatedProducts] = await Promise.all([
    getProductById(id),
    getRelatedProducts(id, 3),
  ]);

  if (product === null) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-surface-page">
        <ScrollToTop />
        <div
          style={{
            ...wrap,
            padding: "clamp(28px,4vw,44px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)",
          }}
        >
          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8">
            <Breadcrumb productName={product.name} />
          </div>

          {/* Two-column grid: gallery left, info right */}
          <div className="grid grid-cols-1 md:grid-cols-[55%_1fr] gap-8 md:gap-12 items-start">

            {/* LEFT — Image gallery */}
            <ImageGallery images={product.images ?? []} productName={product.name} />

            {/* RIGHT — Product info panel */}
            <div className="flex flex-col gap-5">

              {/* Category + badge row */}
              <div className="flex items-center gap-3 flex-wrap">
                {product.category && (
                  <span
                    className="font-sans font-medium uppercase tracking-[0.16em]"
                    style={{ fontSize: "var(--text-2xs)", color: "var(--gold-500)" }}
                  >
                    {product.category}
                  </span>
                )}
                {product.original != null && product.original > product.price && !product.badge && (
                  <Badge tone="sale">
                    -{Math.round((1 - product.price / product.original) * 100)}%
                  </Badge>
                )}
                {product.badge && (
                  <Badge tone={product.badge.tone}>{product.badge.label}</Badge>
                )}
              </div>

              {/* Product name */}
              <h1
                className="font-serif font-semibold leading-tight"
                style={{ fontSize: "var(--text-4xl)", color: "var(--ink-900)", margin: 0 }}
              >
                {product.name}
              </h1>

              {/* Price */}
              <PriceTag price={product.price} original={product.original} size="lg" />

              <hr style={{ borderColor: "var(--border-soft)", margin: 0 }} />

              {/* Description */}
              {product.description && (
                <p
                  className="font-sans leading-relaxed"
                  style={{ color: "var(--ink-700)", fontSize: "var(--text-base)" }}
                >
                  {product.description}
                </p>
              )}

              {/* Add to cart */}
              <AddToCartButton product={product} />

              {/* Social share */}
              <SocialShareButton url={`/catalogo/${product.id}`} title={product.name} />

            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section
              className="mt-16 md:mt-24"
              style={{ borderTop: "1px solid var(--border-soft)", paddingTop: "clamp(32px,4vw,56px)" }}
            >
              <SectionHead
                eyebrow="Veja também"
                title="Produtos relacionados"
              />
              <RelatedProductsGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
