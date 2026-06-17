"use client";

import { useEffect, useState } from "react";
import { fetchFeaturedFeedbacks } from "@/lib/queries/client";
import { type Feedback } from "@/lib/data";

type FeedbackQueryState = {
  feedbacks: Feedback[];
  loading: boolean;
  error: string | null;
};

const initial: FeedbackQueryState = { feedbacks: [], loading: true, error: null };

export function useFeaturedFeedbacks(): FeedbackQueryState {
  const [state, setState] = useState<FeedbackQueryState>(initial);

  useEffect(() => {
    let cancelled = false;

    fetchFeaturedFeedbacks()
      .then((feedbacks) => {
        if (cancelled) return;
        setState({ feedbacks, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Erro desconhecido";
        setState({ feedbacks: [], loading: false, error: message });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
