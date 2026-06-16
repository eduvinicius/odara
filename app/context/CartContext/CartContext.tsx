"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import type { CartItem } from "@/lib/cart";
import type { Product } from "@/lib/data";
import type { CartContextValue } from "./cartContext.types";
import { CART_STORAGE_KEY } from "./cartContext.data";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems]   = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [
        ...prev,
        {
          id:    product.id,
          name:  product.name,
          price: product.price,
          icon:  product.icon,
          image: product.image,
          qty:   1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((it) => it.id !== id));
    } else {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty } : it))
      );
    }
  }, []);

  const count = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        count,
        total,
        isOpen,
        openCart:  () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
