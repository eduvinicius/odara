"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/app/components/commerce/ProductCard";
import { Button } from "@/app/components/core/Button";
import { useCart } from "@/app/context/CartContext";
import { PRODUCTS } from "@/lib/data";
import { SectionHead } from "./SectionHead";

export function ProductSections() {
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const promos   = PRODUCTS.filter((p) => p.original != null).slice(0, 4);
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  function toggleFav(id: number) {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
            {promos.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                favorite={!!favorites[p.id]}
                onFavorite={() => toggleFav(p.id)}
                onAdd={addItem}
              />
            ))}
          </div>
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
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
            {featured.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                favorite={!!favorites[p.id]}
                onFavorite={() => toggleFav(p.id)}
                onAdd={addItem}
              />
            ))}
          </div>
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
