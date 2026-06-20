// Browser-client query functions — safe to import in 'use client' components.
// Uses the anon-key Supabase client (NEXT_PUBLIC_*).

import { createClient } from "@/lib/supabase";
import { rowToProduct, PRODUCTS_TABLE, type Product, type ProductRow } from "@/lib/data";

export async function fetchProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("id");

  if (error) throw new Error(`Failed to fetch featured products: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

export async function fetchPromoProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("active", true)
    .not("original_price", "is", null)
    .order("id");

  if (error) throw new Error(`Failed to fetch promo products: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (category === "Todos") return fetchProducts();

  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*")
    .eq("active", true)
    .eq("category_id", category.toLowerCase())
    .order("id");

  if (error) throw new Error(`Failed to fetch products by category: ${error.message}`);
  return (data as ProductRow[]).map((row) => rowToProduct(row));
}
