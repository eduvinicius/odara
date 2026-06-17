"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { rowToProduct, type Category, type Product, type ProductRow, type QueryState } from "@/lib/data";

const initial: QueryState = { data: [], loading: true, error: null };

export function useProductsByCategory(category: Category): QueryState {
  const [state, setState] = useState<QueryState>(initial);

  useEffect(() => {
    let cancelled = false;
    setState(initial);
    const supabase = createClient();

    const query =
      category === "Todos"
        ? supabase.from("Products").select("*").eq("active", true).order("id")
        : supabase.from("Products").select("*").eq("active", true).eq("category_id", category.toLowerCase()).order("id");

    query.then(({ data, error }) => {
      if (cancelled) return;
      if (error) setState({ data: [], loading: false, error: error.message });
      else setState({ data: (data as ProductRow[]).map((r) => rowToProduct(r)), loading: false, error: null });
    });

    return () => { cancelled = true; };
  }, [category]);

  return state;
}
