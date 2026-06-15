"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/app/components/core/Logo";
import { IconButton } from "@/app/components/core/IconButton";

const NAV_ITEMS = [
  { href: "/",        label: "Início" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/about",   label: "Quem somos" },
];

interface HeaderProps {
  cartCount?: number;
  onCartOpen?: () => void;
}

export function Header({ cartCount = 0, onCartOpen }: HeaderProps) {
  const pathname = usePathname();

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

      <nav className="flex gap-[6px] mx-auto">
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-[14px] py-2 font-sans text-md tracking-[0.01em] transition-colors duration-[140ms] rounded-sm ${
                active ? "font-semibold text-gold-600" : "font-normal text-ink-700 hover:text-gold-600"
              }`}
            >
              {label}
              <span
                className="absolute left-[14px] right-[14px] bottom-[2px] h-[2px] rounded-[2px] transition-opacity duration-[140ms]"
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
        <Link href="/catalog" aria-label="Buscar">
          <IconButton icon={Search} ariaLabel="Buscar" />
        </Link>
        <IconButton
          icon={ShoppingBag}
          ariaLabel="Carrinho"
          count={cartCount}
          onClick={onCartOpen}
        />
      </div>
    </header>
  );
}
