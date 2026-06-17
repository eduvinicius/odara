"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
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
    const supabase = createClient();

    supabase
      .from("feedbacks")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setState({ feedbacks: [], loading: false, error: error.message });
        else setState({ feedbacks: (data as Feedback[]) ?? [], loading: false, error: null });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
