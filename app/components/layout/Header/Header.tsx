"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/app/components/core/Logo";
import { IconButton } from "@/app/components/core/IconButton";
import { useCart } from "@/app/context/CartContext";
import { NAV_ITEMS } from "./header.data";

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-6 border-b border-border-soft"
      style={{
        height: "var(--header-h)",
        padding: "0 clamp(16px, 4vw, 48px)",
        background: "rgba(251,246,239,0.82)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Link href="/" aria-label="Odara — página inicial">
        <Logo size="sm" />
      </Link>

      <nav className="flex gap-1.5 mx-auto">
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-3.5 py-2 font-sans text-md tracking-[0.01em] transition-colors duration-140 rounded-sm ${
                active ? "font-semibold text-gold-600" : "font-normal text-ink-700 hover:text-gold-600"
              }`}
            >
              {label}
              <span
                className="absolute left-3.5 right-3.5 bottom-0.5 h-0.5 rounded-[2px] transition-opacity duration-140"
                style={{
                  background: "var(--gradient-gold)",
                  opacity: active ? 1 : 0,
                }}
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-1">
        <Link href="/catalogo" aria-label="Buscar">
          <IconButton icon={Search} ariaLabel="Buscar" />
        </Link>
        <IconButton
          icon={ShoppingBag}
          ariaLabel="Carrinho"
          count={count}
          onClick={openCart}
        />
      </div>
    </header>
  );
}
