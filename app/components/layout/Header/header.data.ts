export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/",        label: "Início" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/about",   label: "Quem somos" },
];
