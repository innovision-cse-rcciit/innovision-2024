import { supabase } from "@/lib/supabase-client";
import { Role } from "@/lib/schema/add-coordinator-volunteer-schema";

export async function getAllCoordinators() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (!data.session)
            throw new Error("User must be logged in");

        const coordinators = await supabase
            .from("roles")
            .select(`
            role,
            id (
            id,
            name,
            email
            ),
            event_id (
            event_name
            )
            `)
            .in("role", ["COORDINATOR", "VOLUNTEER"]);

        if (coordinators.data?.length === 0)
            return [];

        const refined = coordinators?.data?.map((coordinator) => {
            return {
                id: coordinator.id,
                name: coordinator.id?.name,
                email: coordinator.id?.email,
                event: coordinator.event_id?.event_name,
                type: coordinator.role as Role
            };
        });

        return refined;
    } catch (error) {
        throw new Error(`Error occured while fetching coordinators ${error}`);
    }
}