import { supabase } from "@/lib/supabase-client";

export async function getAllEvents() {
  try{
    const {data,error} = await supabase
    .from("events")
    .select('*,event_categories(*)');

  if (error) {
    throw error;
  }

  return data;
  }
  catch(error){
    console.log(error);
  }
}