"use client";

import Link from "next/link";
import { Button } from "@/app/components/core/Button";
import { useCart } from "@/app/context/CartContext";
import { SectionHead } from "./SectionHead";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/data";

type ProductSectionsProps = {
  promos: Product[];
  featured: Product[];
};

export function ProductSections({ promos, featured }: Readonly<ProductSectionsProps>) {
  const { addItem } = useCart();

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
          {promos.length > 0 && (
            <ProductGrid products={promos.slice(0, 4)} onAdd={addItem} />
          )}
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
          {featured.length > 0 && (
            <ProductGrid products={featured.slice(0, 4)} onAdd={addItem} />
          )}
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
