// Server-only — import ONLY from Server Components, Route Handlers, or Server Actions.
// Fetches product data from Supabase using the SSR server client.

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { rowToProduct, type Category, type Product, type ProductRow } from "@/lib/data";

export const PAGE_SIZE = 12;

async function db() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("id");

  if (error) throw new Error(`Failed to fetch featured products: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

// ─── Paginated query ─────────────────────────────────────────────────────────

export type PaginatedProducts = {
  products: Product[];
  totalCount: number;
  totalPages: number;
  page: number;
};

export async function getProductsPaginated(
  page: number,
  category: Category,
  search: string,
): Promise<PaginatedProducts> {
  const supabase = await db();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("Products")
    .select("*", { count: "exact" })
    .eq("active", true);

  if (category !== "Todos") {
    query = query.eq("category_id", category.toLowerCase());
  }

  if (search.trim() !== "") {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error, count } = await query.order("id").range(from, to);

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    products: (data as ProductRow[]).map((row) => rowToProduct(row)),
    totalCount,
    totalPages,
    page,
  };
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  if (category === "Todos") return getProducts();

  const supabase = await db();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("active", true)
    .eq("category_id", category.toLowerCase())
    .order("id");

  if (error) throw new Error(`Failed to fetch products by category: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw new Error(`Failed to fetch product ${id}: ${error.message}`);
  }
  return rowToProduct(data as ProductRow);
}
