"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/app/components/commerce/ProductCard";
import { Button } from "@/app/components/core/Button";
import { useCart } from "@/app/context/CartContext";
import { useFeaturedProducts, usePromoProducts } from "@/lib/hooks";
import { SectionHead } from "./SectionHead";

function ProductGrid({ ids, onAdd, onCardClick }: Readonly<{
  ids: Parameters<typeof ProductCard>[0]["product"][];
  onAdd: Parameters<typeof ProductCard>[0]["onAdd"];
  onCardClick: (id: string) => void;
}>) {
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
      {ids.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={onAdd}
          onClick={() => onCardClick(p.id)}
        />
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-cream-100 animate-pulse"
          style={{ height: 320 }}
        />
      ))}
    </div>
  );
}

export function ProductSections() {
  const { addItem } = useCart();
  const router = useRouter();

  function handleCardClick(id: string): void {
    router.push(`/catalogo/${id}`);
  }

  const promos    = usePromoProducts();
  const featured  = useFeaturedProducts();

  return (
    <>
      {/* Promoções */}
      <section style={{ padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHead
            eyebrow="Em promoção"
            title="Ofertas com carinho"
            sub="Presentes especiais por um precinho mais doce."
          />
          {promos.loading ? (
            <SkeletonGrid />
          ) : promos.data.length > 0 ? (
            <ProductGrid
              ids={promos.data.slice(0, 4)}
              onAdd={addItem}
              onCardClick={handleCardClick}
            />
          ) : null}
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-surface-sunken">
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
          <SectionHead
            eyebrow="Seleção da casa"
            title="Os queridinhos"
            sub="Os presentes que mais conquistam corações."
          />
          {featured.loading ? (
            <SkeletonGrid />
          ) : featured.data.length > 0 ? (
            <ProductGrid
              ids={featured.data.slice(0, 4)}
              onAdd={addItem}
              onCardClick={handleCardClick}
            />
          ) : null}
          <div className="text-center mt-10">
            <Link href="/catalogo">
              <Button variant="secondary" size="lg" iconRight="arrow-right">
                Ver todo o catálogo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
