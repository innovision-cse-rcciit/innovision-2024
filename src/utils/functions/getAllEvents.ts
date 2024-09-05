import { supabase } from "@/lib/supabase-client";

export async function getAllEvents() {
  const { data, error } = await supabase.auth.getSession();

  const allEvents = await supabase
    .from("events")
    .select();

  if (error) {
    throw error;
  }

  return allEvents?.data || [];
}