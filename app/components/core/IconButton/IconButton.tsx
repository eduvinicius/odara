"use client";

import type { IconButtonProps } from "./iconButton.types";
import { dims, variantClasses } from "./iconButton.data";

export function IconButton({
  icon: Icon,
  variant = "ghost",
  size = "md",
  count,
  active = false,
  disabled = false,
  ariaLabel,
  onClick,
  className,
}: Readonly<IconButtonProps>) {
  const dim = dims[size];
  const isGold = variant === "gold";
  const iconSize = Math.round(dim * 0.42);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`relative inline-flex items-center justify-center rounded-circle border transition-[background,color,transform] duration-140 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${active ? "text-gold-500" : "text-ink-700"}${className ? ` ${className}` : ""}`}
      style={{
        width: dim,
        height: dim,
        ...(isGold ? { background: "var(--gradient-gold)", color: "#43320F" } : undefined),
      }}
    >
      <Icon size={iconSize} strokeWidth={1.75} />
      {count != null && count > 0 && (
        <span className="absolute top-0.5 right-0.5 min-w-4.5 h-4.5 px-1.25 inline-flex items-center justify-center bg-rose-400 text-white font-sans text-[11px] font-semibold leading-none rounded-pill shadow-[0_0_0_2px_var(--surface-card)]">
          {count}
        </span>
      )}
    </button>
  );
}
