// Server-only — import ONLY from Server Components, Route Handlers, or Server Actions.
// Fetches product data from Supabase using the SSR server client.

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Badge, Category, Product } from "@/lib/data";

// Shape of a row returned by Supabase. `badge` is JSONB in the database.
type ProductRow = {
  id: number;
  name: string;
  category: string;
  price: number;
  original: number | null;
  icon: string | null;
  image: string | null;
  featured: boolean;
  badge: { tone: string; label: string } | null;
};

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Category,
    price: row.price,
    ...(row.original != null && { original: row.original }),
    ...(row.icon != null && { icon: row.icon }),
    ...(row.image != null && { image: row.image }),
    ...(row.featured && { featured: row.featured }),
    ...(row.badge != null && { badge: row.badge as Badge }),
  };
}

async function db() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("id");

  if (error) throw new Error(`Failed to fetch featured products: ${error.message}`);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  if (category === "Todos") return getProducts();

  const supabase = await db();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");

  if (error) throw new Error(`Failed to fetch products by category: ${error.message}`);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw new Error(`Failed to fetch product ${id}: ${error.message}`);
  }
  return rowToProduct(data as ProductRow);
}
