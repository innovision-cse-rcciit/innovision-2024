import { supabase } from "@/lib/supabase-client";
import { clearSpaces } from "./validateReg";

export const eventReg = async (
  team: any,
  participants: any,
  eventId: any,
  user: any
) => {
  let combinedEmails = "";
  const participantEmails = participants.map(
    (participant: any) => participant.email
  );
  if (participantEmails.length > 1) {
    combinedEmails = participantEmails.join(" , ");
  } else {
    combinedEmails = team.teamLeadEmail;
  }
  console.log(participants);

  const eventResponse = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  let teamId = "";
  const eventType =
    eventResponse.data![0].min_team_size > 1 ? "team" : "individual";
  if (eventType === "team") {
    const { data } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_id: user?.id,
        team_lead_email: user?.email,
      })
      .select();
    teamId = data![0].team_id!;
    participants.forEach(async (participant: any) => {
      console.log(participant);
      await supabase
        .from("participants")
        .insert({
          team_id: teamId,
          event_id: eventId,
          phone: clearSpaces(participant.phone).trim(),
          name: participant.name,
          email: participant.email,
          college_roll: clearSpaces(participant.roll).trim(),
          requirement: participant?.extra,
        })
        .select();
    });
    participantEmails?.forEach(async (email: string) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          to: email,
          subject: "Event Registration",
          fileName: "send-mail.ejs",
          data: {
            eventName: eventResponse.data![0]?.event_name,
          },
        }),
      });

      const result = await response.json();
      console.log(result);
    });
  }

  if (eventType === "individual") {
    const { data: individualData, error: individualError } = await supabase
      .from("teams")
      .insert({
        team_name: team.teamName,
        event_id: eventId,
        team_lead_id: user?.id,
        team_lead_email: user?.email,
      })
      .select();
    teamId = individualData![0].team_id!;
    const { data: participantData, error: participantError } = await supabase
      .from("participants")
      .insert({
        team_id: individualData![0].team_id!,
        event_id: eventId,
        phone: clearSpaces(team.teamLeadPhone).trim(),
        name: team.teamLeadName,
        email: team.teamLeadEmail,
        college_roll: clearSpaces(team.teamLeadRoll).trim(),
        attendance: null,
        requirement: team?.extra,
      })
      .select();

    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        to: team.teamLeadEmail,
        subject: "Event Registration",
        fileName: "send-mail.ejs",
        data: {
          eventName: eventResponse.data![0]?.event_name,
        },
      }),
    });

    const result = await response.json();
    console.log(result);
    if (individualError || participantError) {
      console.log(individualError, participantError);
    }
    // console.log(individualData, participantData);
  }
};
