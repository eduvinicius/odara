"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@/app/components/core/Button";
import type { Product } from "@/lib/data";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: Readonly<AddToCartButtonProps>) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(product);
  }

  return (
    <Button
      variant="primary"
      size="lg"
      iconLeft="shopping-cart"
      onClick={handleAddToCart}
      fullWidth
    >
      Adicionar ao carrinho
    </Button>
  );
}
