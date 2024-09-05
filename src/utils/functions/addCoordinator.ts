import { Role } from "@/lib/schema/add-coordinator-volunteer-schema";
import { supabase } from "@/lib/supabase-client";

type IEventRequest = {
    coordinators: any;
    eventId: string
}

export async function addCoordinator({ coordinators, eventId }: IEventRequest) {
    try {
        console.log('Inside the function:', coordinators, eventId);
        const { data, error } = await supabase.auth.getSession();
        if (!data.session)
            throw new Error("User must be logged in");

        const userRole = await supabase
            .from("roles")
            .select()
            .eq("id", data.session.user.id);
        console.log(userRole);
        if (!userRole?.data?.[0])
            throw new Error("User role isn't available");

        if (userRole.data[0].role !== 'ADMIN')
            throw new Error("This user cannot insert new event");

        const emailQueries = coordinators.map((coordinator: any) => {
            return supabase
                .from('users')
                .select('id, email')
                .eq('email', coordinator.email)
                .single(); // Fetch one user per email
        });

        // Resolve all user queries in parallel
        const userResults = await Promise.all(emailQueries);

        // Handle errors or collect user IDs
        const users = userResults.map(({ data, error }, index) => {
            if (error || !data) {
                throw new Error(`User with email ${coordinators[index].email} not found.`);
            }
            return { id: data.id, email: data.email, role: coordinators[index].role };
        });

        console.log('Fetched Users:', users);

        // Map user IDs to their respective roles
        const insertRolePromises = coordinators.map((coordinator: any, index: number) => {
            const user = users.find((u) => u.email === coordinator.email); // Find user by email

            // Insert the role for the found user
            return supabase.from("roles").insert({
                id: user?.id, // Use the user ID
                role: coordinator.role as Role,
                event_id: eventId // Use the inserted event's ID
            });
        });

        // Insert roles concurrently
        const roleInsertResults = await Promise.all(insertRolePromises);
        console.log('Roles Inserted');

        // Check for errors in role inserts
        roleInsertResults.forEach(({ error: roleInsertError }) => {
            if (roleInsertError) {
                throw roleInsertError;
            }
        });

        return roleInsertResults;
    } catch (error) {
        console.log(error);
        throw new Error(`Error occured: ${error}`);
    }
}