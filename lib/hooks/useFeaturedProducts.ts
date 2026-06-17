"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { rowToProduct, type ProductRow, type QueryState } from "@/lib/data";

const initial: QueryState = { data: [], loading: true, error: null };

export function useFeaturedProducts(): QueryState {
  const [state, setState] = useState<QueryState>(initial);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    supabase
      .from("Products")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .order("id")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setState({ data: [], loading: false, error: error.message });
        else setState({ data: (data as ProductRow[]).map((r) => rowToProduct(r)), loading: false, error: null });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
