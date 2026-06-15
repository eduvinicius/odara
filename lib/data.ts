export const WHATSAPP = "5599999999999"; // TODO: replace with Odara's real WhatsApp number

export const CATEGORIES = [
  "Todos",
  "Aromas",
  "Caixas",
  "Joias",
  "Flores",
  "Doces",
  "Decoração",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Badge {
  tone: "sale" | "new" | "gold" | "neutral";
  label: string;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  original?: number;
  icon?: string;
  image?: string;
  featured?: boolean;
  badge?: Badge;
}

export const PRODUCTS: Product[] = [
  { id: 1,  name: "Vela aromática de baunilha",  category: "Aromas",    price: 71.90,  original: 89.90,  icon: "flame",            featured: true },
  { id: 2,  name: "Caixa surpresa dourada",       category: "Caixas",    price: 129.90,                   icon: "gift",             featured: true, badge: { tone: "new", label: "Novidade" } },
  { id: 3,  name: "Colar coração folheado",       category: "Joias",     price: 89.90,                    icon: "gem",              featured: true },
  { id: 4,  name: "Buquê de flores secas",        category: "Flores",    price: 64.90,  original: 79.90,  icon: "flower-2",         featured: true },
  { id: 5,  name: "Kit chocolates artesanais",    category: "Doces",     price: 54.90,                    icon: "cookie" },
  { id: 6,  name: "Difusor de ambiente lavanda",  category: "Aromas",    price: 49.90,                    icon: "droplet" },
  { id: 7,  name: "Caixa para presente kraft",    category: "Caixas",    price: 24.90,                    icon: "package" },
  { id: 8,  name: "Pulseira de miçangas",         category: "Joias",     price: 39.90,  original: 49.90,  icon: "gem" },
  { id: 9,  name: "Sabonete artesanal de rosas",  category: "Aromas",    price: 19.90,                    icon: "flower" },
  { id: 10, name: "Caneca personalizada",         category: "Decoração", price: 44.90,                    icon: "coffee" },
  { id: 11, name: "Porta-joias de madeira",       category: "Decoração", price: 79.90,                    icon: "box" },
  { id: 12, name: "Cesta café da manhã",          category: "Caixas",    price: 159.90, original: 189.90, icon: "utensils-crossed",  badge: { tone: "new", label: "Novidade" } },
];

export function money(n: number): string {
  return "R$ " + n.toFixed(2).replace(".", ",");
}
