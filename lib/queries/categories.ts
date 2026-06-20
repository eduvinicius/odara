// Server-only — import ONLY from Server Components, Route Handlers, or Server Actions.
// Fetches category data from Supabase using the SSR server client.

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { CATEGORIES_TABLE } from "@/lib/data";

async function db() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getCategories(): Promise<string[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select("label")
    .order("ord", { ascending: true });

  if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
  return (data as { label: string }[]).map((row) => row.label);
}
