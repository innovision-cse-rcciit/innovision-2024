import { supabase } from "@/lib/supabase-client";
import { Role } from "@/lib/schema/add-coordinator-volunteer-schema";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type ICoordinators = {
    eventId: string | null;
}

export async function getAllCoordinators({ eventId }: ICoordinators) {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (!data.session)
            throw new Error("User must be logged in");

        let coordinators: PostgrestSingleResponse<any[]>;
        if (eventId) {
            coordinators = await supabase
                .from("roles")
                .select(`
                    role,
                    id (
                    id,
                    name,
                    email,
                    college_roll
                    ),
                    event_id (
                    event_name
                    )
                    `)
                .in("role", ["COORDINATOR", "VOLUNTEER"])
                .eq("event_id", eventId);
        } else {
            coordinators = await supabase
                .from("roles")
                .select(`
            role,
            id (
            id,
            name,
            email,
             college_roll
            ),
            event_id (
            event_name
            )
            `)
                .in("role", ["COORDINATOR", "VOLUNTEER"]);
        }
        console.log(coordinators)

        if (coordinators.data?.length === 0)
            return [];

        const refined = coordinators?.data?.map((coordinator) => {
            return {
                id: coordinator.id,
                name: coordinator.id?.name,
                email: coordinator.id?.email,
                event: coordinator.event_id?.event_name,
                type: coordinator.role as Role,
                college_roll: coordinator.id?.college_roll?.toUpperCase()
            };
        });

        return refined;
    } catch (error) {
        throw new Error(`Error occured while fetching coordinators ${error}`);
    }
}