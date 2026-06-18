"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "@/app/components/commerce/ProductCard";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/data";

type RelatedProductsGridProps = {
  products: Product[];
};

export function RelatedProductsGrid({ products }: Readonly<RelatedProductsGridProps>) {
  const { addItem } = useCart();
  const router = useRouter();

  if (products.length === 0) return null;

  function handleCardClick(id: string): void {
    router.push(`/catalogo/${id}`);
  }

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
          onClick={() => handleCardClick(p.id)}
        />
      ))}
    </div>
  );
}
