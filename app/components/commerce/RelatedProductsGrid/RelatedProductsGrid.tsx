"use client";

import { ProductCard } from "@/app/components/commerce/ProductCard";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/data";

type RelatedProductsGridProps = {
  products: Product[];
};

export function RelatedProductsGrid({ products }: Readonly<RelatedProductsGridProps>) {
  const { addItem } = useCart();

  if (products.length === 0) return null;

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={addItem}
          href={`/catalogo/${p.id}`}
        />
      ))}
    </div>
  );
}
