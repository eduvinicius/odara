"use client";

import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "@/lib/queries/client";
import { type Product } from "@/lib/data";

type CategoryState = {
  category: string;
  data: Product[];
  loading: boolean;
  error: string | null;
};

export function useProductsByCategory(
  category: string,
): { data: Product[]; loading: boolean; error: string | null } {
  const [state, setState] = useState<CategoryState>({
    category,
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetchProductsByCategory(category)
      .then((data) => {
        if (cancelled) return;
        setState({ category, data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setState({ category, data: [], loading: false, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  // If the category prop has changed but the effect hasn't settled yet,
  // return loading state derived at render time — no synchronous setState needed.
  if (state.category !== category) {
    return { data: [], loading: true, error: null };
  }

  return { data: state.data, loading: state.loading, error: state.error };
}
