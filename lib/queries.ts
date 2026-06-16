// Server-only — import ONLY from Server Components, Route Handlers, or Server Actions.
// Fetches product data from Supabase using the SSR server client.

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { rowToProduct, type Category, type Product, type ProductRow } from "@/lib/data";

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
