"use client";

import * as LucideIcons from "lucide-react";

function resolveIcon(name: string | undefined) {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;
  return LucideIcons[key] as React.ComponentType<{ size: number }> | undefined;
}

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "whatsapp" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name, e.g. "arrow-right", "message-circle" */
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-[var(--control-h-sm)] px-4 text-sm",
  md: "h-[var(--control-h-md)] px-5 text-sm",
  lg: "h-[var(--control-h-lg)] px-6 text-md",
};

const variantClasses = {
  primary:   "text-[#43320F] border-transparent shadow-gold",
  secondary: "bg-emerald-500 text-cream-100 border-transparent shadow-sm",
  whatsapp:  "bg-[#1FA855] text-white border-transparent shadow-[0_10px_24px_rgba(31,168,85,.28)]",
  outline:   "bg-transparent text-gold-500 border-gold-300",
  ghost:     "bg-transparent text-ink-700 border-transparent",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  className,
}: ButtonProps) {
  const IconLeft  = resolveIcon(iconLeft);
  const IconRight = resolveIcon(iconRight);
  const isPrimary = variant === "primary";

  const base = `inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[0.02em] rounded-pill whitespace-nowrap border transition-[transform,filter,box-shadow] duration-[140ms] cursor-pointer select-none
    active:translate-y-px hover:brightness-[0.96]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${sizeClasses[size]} ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className ?? ""}`;

  const content = (
    <>
      {IconLeft  && <IconLeft  size={18} />}
      {children  && <span>{children}</span>}
      {IconRight && <IconRight size={18} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={base} style={isPrimary ? { background: "var(--gradient-gold)" } : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={base}
      style={isPrimary ? { background: "var(--gradient-gold)" } : undefined}
    >
      {content}
    </button>
  );
}
