import type { LucideIcon } from "lucide-react";

export interface IconButtonProps {
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
