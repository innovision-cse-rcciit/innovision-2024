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
                    ),
                    phone,
                    team_id
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
                    ),
                    phone,
                    team_id
                    `);
        }

        if (participants.data?.length === 0)
            return [];

        const teamMap: { [key: string]: any[] } = {};

        participants.data?.forEach((participant) => {
            const teamId = participant.team_id || 'no_team';
            if (!teamMap[teamId]) {
                teamMap[teamId] = [];
            }
            teamMap[teamId].push(participant);
        });

        const refined = await Promise.all(
            participants.data!.map(async (participant) => {
                const teamMembers = teamMap[participant.team_id || 'no_team'];
                let teamLeadId = null;

                if (participant.team_id) {
                    const { data: teamData, error: teamError } = await supabase
                        .from("teams")
                        .select("team_lead_id")
                        .eq("team_id", participant.team_id)
                        .single();

                    if (teamError) {
                        console.error(
                            `Error fetching team lead for team_id ${participant.team_id}:`,
                            teamError
                        );
                    } else {
                        teamLeadId = teamData?.team_lead_id || null;
                    }
                }

                // const members = teamMembers.map((member) => {
                //     if (member.id != teamLeadId)
                //         return member.name;
                // }
                // );

                return {
                    id: participant.id,
                    name: participant.name,
                    email: participant.email,
                    event: participant.event_id.event_name,
                    phone: participant.phone,
                    team_id: participant.team_id,
                    team_members: teamMembers,
                    team_lead_id: teamLeadId,
                };
            }));

        return refined;
    } catch (error) {
        throw new Error("Unable to fetch participants");
    }
}