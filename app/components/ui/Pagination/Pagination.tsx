import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "./pagination.types";

function buildHref(basePath: string, targetPage: number, params: Record<string, string>): string {
  const merged = { ...params, page: String(targetPage) };
  const qs = new URLSearchParams(merged).toString();
  return `${basePath}?${qs}`;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
}

export function Pagination({ page, totalPages, basePath, params = {} }: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const pageNumbers = getPageNumbers(page, totalPages);

  const prevHref = buildHref(basePath, page - 1, params);
  const nextHref = buildHref(basePath, page + 1, params);

  return (
    <nav aria-label="Navegação de páginas" className="flex items-center justify-center gap-1 mt-10">
      {/* Previous button */}
      {hasPrev ? (
        <Link
          href={prevHref}
          aria-label="Página anterior"
          className="inline-flex items-center justify-center w-10 h-10 rounded-pill border border-border-std text-ink-500 transition-colors duration-140 hover:border-gold-300 hover:text-gold-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center w-10 h-10 rounded-pill border border-border-soft text-ink-300 cursor-not-allowed"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </span>
      )}

      {/* Page number buttons */}
      {pageNumbers.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="inline-flex items-center justify-center w-10 h-10 text-ink-300 text-sm select-none"
            >
              …
            </span>
          );
        }

        const isActive = item === page;

        if (isActive) {
          return (
            <span
              key={item}
              aria-current="page"
              aria-label={`Página ${item}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-pill text-sm font-medium shadow-sm"
              style={{ background: "var(--gradient-gold)", color: "var(--text-on-gold)" }}
            >
              {item}
            </span>
          );
        }

        return (
          <Link
            key={item}
            href={buildHref(basePath, item, params)}
            aria-label={`Página ${item}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-pill border border-border-std text-ink-700 text-sm font-medium transition-colors duration-140 hover:border-gold-300 hover:text-gold-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2"
          >
            {item}
          </Link>
        );
      })}

      {/* Next button */}
      {hasNext ? (
        <Link
          href={nextHref}
          aria-label="Próxima página"
          className="inline-flex items-center justify-center w-10 h-10 rounded-pill border border-border-std text-ink-500 transition-colors duration-140 hover:border-gold-300 hover:text-gold-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex items-center justify-center w-10 h-10 rounded-pill border border-border-soft text-ink-300 cursor-not-allowed"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
