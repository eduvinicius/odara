import { ProductCard } from "@/app/components/commerce/ProductCard";
import type { Product } from "@/lib/data";

type ProductGridProps = {
  products: Product[];
  onAdd: ((product: Product) => void) | undefined;
};

export function ProductGrid({ products, onAdd }: Readonly<ProductGridProps>) {
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAdd={onAdd}
          href={`/catalogo/${p.id}`}
        />
      ))}
    </div>
  );
}
