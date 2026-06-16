// Shared module — imported by both Server and Client Components.
// No server-only imports here. Fetch functions live in lib/queries.ts.

// ─── Constants ───────────────────────────────────────────────────────────────

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

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Badge {
  tone: "sale" | "new" | "gold" | "neutral";
  label: string;
}

export interface Product {
  id: string;            // UUID from Supabase
  name: string;
  category: Category;
  price: number;
  original?: number;     // mapped from original_price
  image?: string;        // mapped from image_url
  icon?: string;         // Lucide icon name (mock data only, not in DB)
  featured?: boolean;
  badge?: Badge;         // reconstructed from badge_tone + badge_label
  active?: boolean;
}

// Shared type for hooks
export type QueryState = { data: Product[]; loading: boolean; error: string | null };

// ─── Supabase row mapping (shared by server queries and client hooks) ─────────

// Exact shape of a row in the Supabase `Products` table.
export type ProductRow = {
  id: string;
  name: string;
  category_id: string;       // e.g. "aromas", "caixas"
  price: number;
  original_price: number | null;
  image_url: string | null;
  featured: boolean;
  badge_tone: string | null;
  badge_label: string | null;
  active: boolean;
};

export function rowToProduct(row: ProductRow): Product {
  const rawCat = row.category_id ?? "";
  const category = (rawCat.charAt(0).toUpperCase() + rawCat.slice(1)) as Category;

  return {
    id: row.id,
    name: row.name,
    category,
    price: row.price,
    ...(row.original_price != null && { original: row.original_price }),
    ...(row.image_url != null && { image: row.image_url }),
    ...(row.featured && { featured: true }),
    ...(row.badge_tone != null && row.badge_label != null && {
      badge: { tone: row.badge_tone as Badge["tone"], label: row.badge_label },
    }),
    active: row.active,
  };
}

// ─── Mock data (dev seed reference) ──────────────────────────────────────────
// Use these rows to seed your Supabase `Products` table.

export const MOCK_PRODUCTS: Product[] = [
  { id: "1",  name: "Vela aromática de baunilha",  category: "Aromas",    price: 71.9,  original: 89.9,  icon: "flame",            featured: true,  active: true },
  { id: "2",  name: "Caixa surpresa dourada",       category: "Caixas",    price: 129.9,                  icon: "gift",             featured: true,  active: true, badge: { tone: "new", label: "Novidade" } },
  { id: "3",  name: "Colar coração folheado",       category: "Joias",     price: 89.9,                   icon: "gem",              featured: true,  active: true },
  { id: "4",  name: "Buquê de flores secas",        category: "Flores",    price: 64.9,  original: 79.9,  icon: "flower-2",         featured: true,  active: true },
  { id: "5",  name: "Kit chocolates artesanais",    category: "Doces",     price: 54.9,                   icon: "cookie",           featured: false, active: true },
  { id: "6",  name: "Difusor de ambiente lavanda",  category: "Aromas",    price: 49.9,                   icon: "droplet",          featured: false, active: true },
  { id: "7",  name: "Caixa para presente kraft",    category: "Caixas",    price: 24.9,                   icon: "package",          featured: false, active: true },
  { id: "8",  name: "Pulseira de miçangas",         category: "Joias",     price: 39.9,  original: 49.9,  icon: "gem",              featured: false, active: true },
  { id: "9",  name: "Sabonete artesanal de rosas",  category: "Aromas",    price: 19.9,                   icon: "flower",           featured: false, active: true },
  { id: "10", name: "Cesta café da manhã",          category: "Caixas",    price: 159.9, original: 189.9, icon: "utensils-crossed", featured: false, active: true, badge: { tone: "new", label: "Novidade" } },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function money(n: number): string {
  return "R$ " + n.toFixed(2).replace(".", ",");
}
