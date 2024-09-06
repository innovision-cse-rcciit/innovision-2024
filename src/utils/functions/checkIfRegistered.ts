import { supabase } from "@/lib/supabase-client";

export const checkIfRegistered = async (eventId: string, userId: string) => {
    try {
        const { data, error } = await supabase
            .from("participants")
            .select("*")
            .eq("event_id", eventId)
            .eq("user_id", userId);
            console.log(data)
        return (data && data!.length > 0) ? true : false;
    } catch (error) {
        console.log(error)
    }
};