import type { Product } from "@/lib/data";

export interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onClick?: () => void;
  href?: string;
}
