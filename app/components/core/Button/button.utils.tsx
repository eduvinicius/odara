import * as LucideIcons from "lucide-react";

export function resolveIcon(name: string | undefined, size: number): React.ReactNode {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;
  const Icon = LucideIcons[key] as React.ComponentType<{ size: number }> | undefined;
  return Icon ? <Icon size={size} /> : null;
}
