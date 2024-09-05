import { supabase } from "@/lib/supabase-client";
import { EVENT_CATEGORIES } from "../constants/event-categories";

type IEventRequest = {
    event: any;
}

export async function addEvent({ event }: IEventRequest) {
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

        const category = EVENT_CATEGORIES[event.event_category];
        const { data: eventData, error: eventError } = await supabase
            .from("events")
            .insert({
                event_name: event.event_name,
                description: event.description,
                banner_url: event.image_path,
                is_open: event.isOpen,
                max_team_size: event.max_team_size,
                min_team_size: event.min_team_size,
                rules: event.rules,
                schedule: event.schedule,
                event_mode: event.event_type,
                event_category_id: category
            })
            .select();

        console.log(eventData);
        if (!eventData)
            throw new Error(`Event can't be created, ${eventError}`);

        return eventData[0];
    } catch (error) {
        throw new Error(`Error occured: ${error}`);
    }
}