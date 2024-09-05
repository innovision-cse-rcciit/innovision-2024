import { supabase } from "@/lib/supabase-client";
import { EventMode } from "@/lib/schema/add-event-schema";

export async function getAllEvents() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (!data.session)
            throw new Error("User must be logged in");

        const userRole = await supabase
            .from("roles")
            .select()
            .eq("id", data.session.user.id);

        if (!userRole?.data?.[0])
            throw new Error("User role isn't available");

        if (userRole.data[0].role !== 'ADMIN')
            throw new Error("This user cannot insert new event");

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