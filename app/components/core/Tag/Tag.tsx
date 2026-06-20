"use client";

import type { TagProps } from "./tag.types";

export function Tag({ children, selected = false, icon: Icon, onClick, className }: Readonly<TagProps>) {
  const stateClass = selected
    ? "border-transparent shadow-sm"
    : "bg-surface-card text-ink-700 border-border-std hover:border-gold-300";

  const classes = [
    "inline-flex items-center gap-[6px] px-4 py-2 font-sans text-sm font-medium tracking-[0.02em] rounded-pill whitespace-nowrap transition-all duration-140 border",
    stateClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      style={
        selected
          ? { background: "var(--gradient-gold)", color: "var(--text-on-gold)" }
          : undefined
      }
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
