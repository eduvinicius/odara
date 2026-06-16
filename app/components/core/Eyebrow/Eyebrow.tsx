import type { EyebrowProps } from "./eyebrow.types";

export function Eyebrow({ children, align = "left", color, className }: Readonly<EyebrowProps>) {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div
      className={`font-sans text-2xs font-medium uppercase tracking-[0.28em] text-gold-500 ${alignClass}${className ? ` ${className}` : ""}`}
      style={color ? { color } : undefined}
    >
      {children}
    </div>
  );
}
