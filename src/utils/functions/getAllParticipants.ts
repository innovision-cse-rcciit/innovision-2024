import { supabase } from "@/lib/supabase-client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type IParticipants = {
    eventId: string | null;
}

export async function getAllParticipants({ eventId }: IParticipants) {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (!data.session)
            throw new Error("User must be logged in");
        let participants: PostgrestSingleResponse<any[]>;
        if (eventId) {
            participants = await supabase
                .from("participants")
                .select(`
                    id,
                    name,
                    email,
                    event_id (
                    event_name
                    )
                    `)
                .eq("event_id", eventId);
        } else {
            participants = await supabase
                .from("participants")
                .select(`
                    id,
                    name,
                    email,
                    event_id (
                    event_name
                    )
                    `);
        }

        if (participants.data?.length === 0)
            return [];

        const refined = participants.data?.map((participant) => {
            return {
                id: participant.id,
                name: participant.name,
                email: participant.email,
                event: participant.event_id.event_name
            };
        });

        return refined;
    } catch (error) {
        throw new Error("Unable to fetch participants");
    }
}