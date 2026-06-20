export const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-[var(--control-h-sm)] px-4 text-sm",
  md: "h-[var(--control-h-md)] px-5 text-sm",
  lg: "h-[var(--control-h-lg)] px-6 text-md",
};

export const variantClasses: Record<"primary" | "secondary" | "whatsapp" | "outline" | "ghost", string> = {
  primary:   "text-on-gold border-transparent shadow-gold",
  secondary: "bg-emerald-500 text-cream-100 border-transparent shadow-sm",
  whatsapp:  "bg-[#1FA855] text-white border-transparent shadow-[0_10px_24px_rgba(31,168,85,.28)]",
  outline:   "bg-transparent text-gold-500 border-gold-300",
  ghost:     "bg-transparent text-ink-700 border-transparent",
};
