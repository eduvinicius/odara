import type { CartItem } from "@/lib/cart";
import type { Product } from "@/lib/data";

export interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}
