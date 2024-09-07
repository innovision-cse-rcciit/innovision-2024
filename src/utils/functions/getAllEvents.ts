import { supabase } from "@/lib/supabase-client";

export async function getAllEvents() {
    try {

        const {data,error} = await supabase
            .from("events")
            .select("*, event_categories(*)");
        return data;
    } catch (error) {
        throw new Error(`Error occured while fetching events ${error}`);
    }
}