export interface CartItem {
  id: string;    // UUID — matches Product.id
  name: string;
  price: number;
  icon?: string;
  image?: string;
  qty: number;
}
