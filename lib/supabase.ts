// Browser client — re-export the factory for use in 'use client' components.
// Usage: const supabase = createClient(); supabase.from('products').select()
export { createClient } from "@/utils/supabase/client";
