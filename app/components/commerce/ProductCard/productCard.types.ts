import type { Product } from "@/lib/data";

export interface ProductCardProps {
  product: Product;
  favorite?: boolean;
  onFavorite?: () => void;
  onAdd?: (product: Product) => void;
  onClick?: () => void;
}
