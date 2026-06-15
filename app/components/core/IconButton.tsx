"use client";

import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  variant?: "ghost" | "soft" | "gold";
  size?: "sm" | "md" | "lg";
  count?: number;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
}

const dims = { sm: 36, md: 44, lg: 52 } as const;

const variantClasses = {
  ghost: "bg-transparent border-transparent hover:bg-cream-100",
  soft:  "bg-cream-100 border-border-soft",
  gold:  "border-transparent",
};

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
}: IconButtonProps) {
  const dim = dims[size];
  const isGold = variant === "gold";
  const iconSize = Math.round(dim * 0.42);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`relative inline-flex items-center justify-center rounded-circle border transition-[background,color,transform] duration-[140ms] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${active ? "text-gold-500" : "text-ink-700"}${className ? ` ${className}` : ""}`}
      style={{
        width: dim,
        height: dim,
        ...(isGold ? { background: "var(--gradient-gold)", color: "#43320F" } : undefined),
      }}
    >
      <Icon size={iconSize} strokeWidth={1.75} />
      {count != null && count > 0 && (
        <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-[5px] inline-flex items-center justify-center bg-rose-400 text-white font-sans text-[11px] font-semibold leading-none rounded-pill shadow-[0_0_0_2px_var(--surface-card)]">
          {count}
        </span>
      )}
    </button>
  );
}
