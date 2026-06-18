"use client";

import { useRouter } from "next/navigation";
import { SearchX } from "lucide-react";
import { Button } from "@/app/components/core/Button";
import { ProductCard } from "@/app/components/commerce/ProductCard";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/data";

type CatalogGridProps = {
  products: Product[];
  totalCount: number;
  q: string;
  onClearFilters: string; // href to navigate to on clear
};

export function CatalogGrid({ products, totalCount, q, onClearFilters }: Readonly<CatalogGridProps>) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleCardClick(id: string): void {
    router.push(`/catalogo/${id}`);
  }

  const countLabel = totalCount === 1 ? "presente encontrado" : "presentes encontrados";

  return (
    <>
      {/* Result count */}
      <div className="flex items-center justify-between mb-4.5 text-ink-500 text-sm">
        <span>
          {totalCount} {countLabel}
          {q && <span> para &ldquo;{q}&rdquo;</span>}
        </span>
      </div>

      {/* Grid or empty state */}
      {products.length > 0 ? (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addItem}
              onClick={() => handleCardClick(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3.5 text-center py-16 text-ink-500">
          <SearchX size={40} className="text-gold-400" />
          <p className="font-serif text-xl text-ink-700">Nenhum presente encontrado</p>
          <p>Tente outro nome ou veja todas as categorias.</p>
          <Button variant="outline" href={onClearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </>
  );
}
