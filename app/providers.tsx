"use client";

import { CartProvider } from "@/app/context/CartContext";
import { CartDrawer } from "@/app/components/layout/CartDrawer";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
