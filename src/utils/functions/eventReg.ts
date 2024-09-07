import { supabase } from "@/lib/supabase-client";
import { clearSpaces } from "./validateReg";
export const eventReg = async (
  team: any,
  participants: any,
  eventId: any,
) => {
  let combinedEmails = "";
  const participantEmails = participants.map((participant: any) => participant.email);
  if (participantEmails.length > 1) {
    combinedEmails = participantEmails.join(' , ');
  } else {
    combinedEmails = team.teamLeadEmail;
  }
  console.log(combinedEmails)

  const eventResponse = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  let teamId = "";
  const eventType =
    eventResponse.data![0].max_team_member > 1 ? "team" : "individual";
  if (eventType === "team") {
    const { data } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: clearSpaces(team.teamLeadPhone).trim(),
        reg_mode: team.regMode,
      })
      .select();
    teamId = data![0].team_id!;
    participants.forEach(async (participant: any) => {
      await supabase
        .from("participations")
        .insert({
          team_id: teamId,
          phone: clearSpaces(participant.phone).trim(),
          name: participant.name,
          email: participant.email,
        })
        .select();
    });
  }

  if (eventType === "individual") {
    const { data: individualData, error: individualError } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_phone: clearSpaces(team.teamLeadPhone).trim(),
        reg_mode: team.regMode,
      })
      .select();
    teamId = individualData![0].team_id!;
    const { data: participantData, error: participantError } = await supabase
      .from("participations")
      .insert({
        team_id: individualData![0].team_id!,
        phone: clearSpaces(team.teamLeadPhone).trim(),
        name: team.teamLeadName,
        email: team.teamLeadEmail,
      })
      .select();
    if (individualError || participantError) {
      console.log(individualError, participantError);
    }
    // console.log(individualData, participantData);
  }
  }
