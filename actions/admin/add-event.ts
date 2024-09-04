import { Role } from '@/lib/schema/add-coordinator-volunteer-schema';
import { supabase } from '@/lib/supabase-client';
export const addEvent = async (values: any, roles: any) => {
    console.log(values, roles);
    delete values.coordinator;
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }
    const { data: eventInsertData, error: eventInsertError }:any = await supabase
        .from("events")
        .insert({
            event_name: values.event_name,
            event_mode: values.event_type,
            banner_url: values.image_path,
            description: values.description,
            max_team_size: values.max_team_size,
            min_team_size: values.min_team_size,
            schedule: values.schedule,
            rules: values.rules
        });

    if (!eventInsertData && eventInsertError)
        throw eventInsertError;
    console.log('Events Inserted');

    // Use Promise.all to insert all roles concurrently
    const insertRolePromises = roles.map((role: any) => {
        return supabase.from("roles").insert({
            id: data.session?.user.id,
            role: role.role as Role,
            event_id: eventInsertData?.id! // Use the inserted event's ID
        });
    });
    console.log('Roles Insertion started');

    const roleInsertResults = await Promise.all(insertRolePromises);
    console.log('Roles Inserted');

    // Check for errors in role inserts
    roleInsertResults.forEach(({ error: roleInsertError }) => {
        if (roleInsertError) {
            throw roleInsertError;
        }
    });
}