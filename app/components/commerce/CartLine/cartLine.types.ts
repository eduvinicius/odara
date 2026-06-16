import type { CartItem } from "@/lib/cart";

export interface CartLineProps {
  item: CartItem;
  onQty: (qty: number) => void;
  onRemove: () => void;
}
