"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/queries/client";
import { type QueryState } from "@/lib/data";

const initial: QueryState = { data: [], loading: true, error: null };

export function useProducts(): QueryState {
  const [state, setState] = useState<QueryState>(initial);

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((data) => {
        if (cancelled) return;
        setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setState({ data: [], loading: false, error: message });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
