import { getPromoProducts, getFeaturedProducts } from "@/lib/queries";
import { ProductSections } from "./ProductSections";

export async function ProductSectionsServer() {
  const [promos, featured] = await Promise.all([
    getPromoProducts(),
    getFeaturedProducts(),
  ]);

  return <ProductSections promos={promos} featured={featured} />;
}
