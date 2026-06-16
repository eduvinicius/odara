import type { LucideIcon } from "lucide-react";

export interface BadgeProps {
  children: React.ReactNode;
  tone?: "sale" | "new" | "gold" | "neutral";
  icon?: LucideIcon;
  className?: string;
}
