import { supabase } from "@/lib/supabase-client";  // Import your types
import { EventDetails, Participant, TeamMember } from "../constants/admin-dashboard";

export const getAllEventsParticipations = async (): Promise<Participant[]> => {
    const { data: eventDetails, error } = await supabase
        .from('events')
        .select('event_name, teams(*)');

    if (error) {
        console.error("Error fetching event details:", error.message);
        return [];
    }

    // Ensure that eventDetails is an array and has at least one event
    if (!eventDetails || eventDetails.length === 0) {
        return [];
    }

    const teamDetails = await Promise.all(eventDetails.map(async (event: any) => {
        return Promise.all(event.teams.map(async (team: any) => {
            // Fetch team members for the current team
            const { data: teamMembersData, error: teamMembersError } = await supabase
                .from("participants")
                .select("*")
                .eq('team_id', team.team_id);

            if (teamMembersError) {
                console.error(`Error fetching team members for team ${team.team_id}:`, teamMembersError.message);
                return null;
            }

            // Fetch team lead details
            const { data: teamLeadData, error: teamLeadError } = await supabase
                .from("users")
                .select("*")
                .eq("id", team.team_lead_id);

            if (teamLeadError || !teamLeadData || teamLeadData.length === 0) {
                console.error(`Error fetching team lead details for team ${team.team_id}:`, teamLeadError?.message);
                return null;
            }

            // Type validation for team members
            const teamMembers: TeamMember[] = teamMembersData.map((member: any) => ({
                id: member.id,
                name: member.name,
                email: member.email,
                phone: member.phone,
                event_id: { event_name: event.event_name } as EventDetails, // Ensure event_name is set in EventDetails
                team_id: member.team_id,
            }));

            // Determine if it's a solo or team participation
            const teamType = teamMembers.length === 1 ? "Solo" : "Team";

            // Return the valid Participant object
            return {
                id: teamLeadData[0].id,
                name: teamLeadData[0].name,
                email: teamLeadData[0].email,
                phone: teamLeadData[0].phone,
                event: event.event_name,
                team_id: team.team_id,
                team_lead_id: team.team_lead_id,
                team_members: teamMembers,
                team_type: teamType,
                team_name: team.team_name,
                team_lead_name: teamLeadData[0].name,
            } as Participant;
        }));
    }));

    // Flatten the nested arrays of team details and filter out null values
    return teamDetails.flat().filter(participant => participant !== null) as Participant[];
};
