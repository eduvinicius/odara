export interface FooterColItem {
  label: string;
  href?: string;
}

export const FOOTER_NAV_ITEMS: FooterColItem[] = [
  { label: "Início",     href: "/" },
  { label: "Catálogo",   href: "/catalogo" },
  { label: "Quem somos", href: "/sobre" },
];

export const FOOTER_CONTACT_ITEMS: FooterColItem[] = [
  { label: "WhatsApp" },
  { label: "@odara.presentes" },
  { label: "contato@odara.com.br" },
];

export const FOOTER_SERVICE_ITEMS: FooterColItem[] = [
  { label: "Seg a Sex · 9h–18h" },
  { label: "Sáb · 9h–13h" },
  { label: "Envios apenas para Campinas-SP" },
];
