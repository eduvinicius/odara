import * as LucideIcons from "lucide-react";
import type { PlaceholderIconProps } from "./placeholderIcon.types";

export function PlaceholderIcon({ name, size, className }: Readonly<PlaceholderIconProps>) {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;
  const Icon = LucideIcons[key] as React.ComponentType<{ size: number; className?: string }> | undefined;
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
