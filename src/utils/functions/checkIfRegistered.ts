import { supabase } from "@/lib/supabase-client";

export const checkIfRegistered = async (eventId: string, email: string) => {
    try {
        const { data, error } = await supabase
            .from("participants")
            .select("*")
            .eq("event_id", eventId)
            .eq("email", email);
            console.log(data)
        return (data && data!.length > 0) ? true : false;
    } catch (error) {
        console.log(error)
    }
};