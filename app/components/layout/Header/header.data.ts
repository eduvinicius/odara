export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/",        label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre",    label: "Quem somos" },
];
