"use client";

import type { ButtonProps } from "./button.types";
import { sizeClasses, variantClasses } from "./button.data";
import { resolveIcon } from "./button.utils";

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
  style,
}: Readonly<ButtonProps>) {
  const isPrimary = variant === "primary";

  const base = `inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[0.02em] rounded-pill whitespace-nowrap border transition-[transform,filter,box-shadow] duration-[140ms] cursor-pointer select-none
    active:translate-y-px hover:brightness-[0.96]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${sizeClasses[size]} ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className ?? ""}`;

  const inlineStyle: React.CSSProperties = {
    ...(isPrimary ? { background: "var(--gradient-gold)" } : {}),
    ...style,
  };

  const content = (
    <>
      {resolveIcon(iconLeft, 18)}
      {children && <span>{children}</span>}
      {resolveIcon(iconRight, 18)}
    </>
  );

  if (href) {
    return (
      <a href={href} className={base} style={inlineStyle}>
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
      style={inlineStyle}
    >
      {content}
    </button>
  );
}
