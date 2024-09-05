import { supabase } from "@/lib/supabase-client";
import { EventMode } from "@/lib/schema/add-event-schema";

export async function getAllEvents() {
    try {

        const eventdata = await supabase
            .from("events")
            .select("*");

        if (!eventdata.data)
            return [];

        const refined = eventdata.data.map((event) => {
            return {
                id: event.id,
                name: event.event_name,
                duration: event.schedule,
                type: event.event_mode as EventMode,
                isOpen: event.is_open
            };
        });

        return refined;
    } catch (error) {
        throw new Error(`Error occured while fetching events ${error}`);
    }
}