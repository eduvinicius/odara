"use client";

import type { TagProps } from "./tag.types";

export function Tag({ children, selected = false, icon: Icon, onClick, className }: Readonly<TagProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-[6px] px-4 py-2 font-sans text-sm font-medium tracking-[0.02em] rounded-pill whitespace-nowrap transition-all duration-140 border ${
        selected
          ? "text-[#43320F] border-transparent shadow-sm"
          : "bg-surface-card text-ink-700 border-border-std hover:border-gold-300"
      }${className ? ` ${className}` : ""}`}
      style={selected ? { background: "var(--gradient-gold)" } : undefined}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
