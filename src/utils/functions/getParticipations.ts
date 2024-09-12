import { supabase } from "@/lib/supabase-client";


export const getParticipations = async (event: string) => {
    let allTeamMembers: any = [];
    const { data: eventDetails, error } = await supabase
        .from('events')
        .select('event_name,teams(*)')
        .eq('id', event);

    if (error) {
        console.error("Error fetching event details:", error.message);
        return [];
    }

    const teamDetails = await Promise.all(eventDetails[0].teams.map(async (team: any, index: number) => {
        const teamMembers = await supabase.from("participants").select("*").eq('team_id', team.team_id);
        const teamLeadDetails = await supabase.from("users").select("*").eq("id", team.team_lead_id);
        const isSWC = teamLeadDetails!.data;
        const teamType = teamMembers?.data?.length === 1 ? "Solo" : "Team";
        return {
            team_id: team.team_id,
            event_name: eventDetails[0].event_name,
            team_lead_email: teamLeadDetails!.data![0].email,
            team_name: team.team_name,
            team_lead_name: teamLeadDetails!.data![0].name,
            team_lead_phone: teamLeadDetails!.data![0].phone,
            team_lead_roll: teamLeadDetails!.data![0].college_roll,
            team_type: teamType,
            team_members: teamMembers.data,
            created_at: team.created_at,
            // attendance: team.attendance
        };
    }));

    return teamDetails;
};