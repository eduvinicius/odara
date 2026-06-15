import { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "sale" | "new" | "gold" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  sale:    "bg-rose-400 text-white",
  new:     "bg-emerald-500 text-white",
  gold:    "text-[#43320F]",
  neutral: "bg-cream-100 text-ink-700",
};

export function Badge({ children, tone = "neutral", icon: Icon, className }: BadgeProps) {
  const isGold = tone === "gold";

  return (
    <span
      className={`inline-flex items-center gap-[5px] px-[11px] py-[5px] font-sans text-2xs font-semibold uppercase tracking-[0.16em] leading-none rounded-pill ${toneClasses[tone]}${className ? ` ${className}` : ""}`}
      style={isGold ? { background: "var(--gradient-gold)" } : undefined}
    >
      {Icon && <Icon size={13} />}
      {children}
    </span>
  );
}
