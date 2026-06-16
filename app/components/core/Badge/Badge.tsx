import type { BadgeProps } from "./badge.types";
import { toneClasses } from "./badge.data";

export function Badge({ children, tone = "neutral", icon: Icon, className }: Readonly<BadgeProps>) {
  const isGold = tone === "gold";

  return (
    <span
      className={`inline-flex items-center gap-1.25 px-2.75 py-1.25 font-sans text-2xs font-semibold uppercase tracking-[0.16em] leading-none rounded-pill ${toneClasses[tone]}${className ? ` ${className}` : ""}`}
      style={isGold ? { background: "var(--gradient-gold)" } : undefined}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}
