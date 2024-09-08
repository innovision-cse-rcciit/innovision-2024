import { supabase } from "@/lib/supabase-client";

export const checkIfRegistered = async (eventId: string, user: any) => {
    try {
        const { data, error } = await supabase
            .from("participants")
            .select("*")
            .eq("event_id", eventId)
            .eq("email", user?.email!)
            .eq("college_roll", user?.college_roll!);
            console.log(data)
        return (data && data!.length > 0) ? true : false;
    } catch (error) {
        console.log(error)
    }
};