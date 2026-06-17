// Server-only — import ONLY from Server Components, Route Handlers, or Server Actions.
// Fetches feedback data from Supabase using the SSR server client.

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { type Feedback } from "@/lib/data";

async function db() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getFeaturedFeedbacks(): Promise<Feedback[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("Feedbacks")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch featured feedbacks: ${error.message}`);
  return (data as Feedback[]) ?? [];
}
