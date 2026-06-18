// Shared module — imported by both Server and Client Components.
// No server-only imports here. Fetch functions live in lib/queries/.

// ─── Types ─────────────────────────────────────────────────────────────────

// Category labels are fetched from Supabase at runtime — see lib/queries/categories.ts getCategories().
export type Category = string;

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
  description?: string;  // mapped from description column
  images?: string[];     // mapped from images column (text[])
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
  description: string | null;
  images: string[] | null;
};

export function rowToProduct(row: ProductRow): Product {
  const rawCat = row.category_id ?? "";
  const category: Category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);

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
    ...(row.description != null && { description: row.description }),
    ...(row.images != null && row.images.length > 0 && { images: row.images }),
  };
}

// ─── Feedback ────────────────────────────────────────────────────────────────

export interface Feedback {
  id: string;
  product_id: string | null;
  name: string;
  description: string;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function money(n: number): string {
  return "R$ " + n.toFixed(2).replace(".", ",");
}
