import { supabase } from "@/lib/supabase-client";

export const getEventById = async (id: string) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select("*,roles(*,users(name,email,phone)),event_categories(*)")
            .eq("id", id);
            console.log(data);
            console.log(error);
        return data![0];
    } catch (error) {
        throw new Error(`Error occured while fetching event ${error}`);
    }
};