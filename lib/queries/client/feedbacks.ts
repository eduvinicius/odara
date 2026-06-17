// Browser-client query functions — safe to import in 'use client' components.
// Uses the anon-key Supabase client (NEXT_PUBLIC_*).

import { createClient } from "@/lib/supabase";
import { type Feedback } from "@/lib/data";

export async function fetchFeaturedFeedbacks(): Promise<Feedback[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Feedbacks")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch featured feedbacks: ${error.message}`);
  return (data as Feedback[]) ?? [];
}
