import type { LucideIcon } from "lucide-react";

export interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}
