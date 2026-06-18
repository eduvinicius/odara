import Link from "next/link";
import type { BreadcrumbProps } from "./breadcrumb.types";

export function Breadcrumb({ productName }: Readonly<BreadcrumbProps>) {
  return (
    <nav aria-label="Navegação estrutural">
      {/* Desktop: full trail — Home › Catálogo › [productName] */}
      <ol className="hidden md:flex items-center gap-2 font-sans text-sm list-none m-0 p-0">
        <li>
          <Link
            href="/"
            className="text-gold-500 hover:text-gold-400 transition-colors duration-140"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-300 select-none">
          ›
        </li>
        <li>
          <Link
            href="/catalogo"
            className="text-gold-500 hover:text-gold-400 transition-colors duration-140"
          >
            Catálogo
          </Link>
        </li>
        <li aria-hidden="true" className="text-ink-300 select-none">
          ›
        </li>
        <li
          aria-current="page"
          className="overflow-hidden text-ellipsis whitespace-nowrap max-w-50 md:max-w-xs text-ink-900 font-medium"
        >
          {productName}
        </li>
      </ol>

      {/* Mobile: condensed back link — ‹ Catálogo */}
      <div className="flex md:hidden">
        <Link
          href="/catalogo"
          className="flex items-center gap-1 font-sans text-sm text-gold-500 hover:text-gold-400 transition-colors duration-140"
        >
          <span aria-hidden="true">‹</span>
          <span>Catálogo</span>
        </Link>
      </div>
    </nav>
  );
}
