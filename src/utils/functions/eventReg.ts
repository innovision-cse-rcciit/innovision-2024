import { supabase } from "@/lib/supabase-client";
import { clearSpaces } from "./validateReg";

export const eventReg = async (
  team: any,
  participants: any,
  eventId: any,
  user: any,
  fileSubmission: boolean,
  file: any
) => {
  try {
    let combinedEmails = "";
    const participantEmails = participants.map(
      (participant: any) => participant.email
    );
    if (participantEmails.length > 1) {
      combinedEmails = participantEmails.join(" , ");
    } else {
      combinedEmails = team.teamLeadEmail;
    }

    const eventResponse = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId);

    let teamId = "";
    const eventType =
      eventResponse.data![0].min_team_size > 1 ? "team" : "individual";
    
    if (eventType === "team") {
      const { data, error: teamInsertError } = await supabase
        .from("teams")
        .insert({
          team_name: team.teamName,
          event_id: eventId,
          team_lead_id: user?.id,
          team_lead_email: user?.email,
        })
        .select();
      if (teamInsertError) throw teamInsertError;

      teamId = data![0].team_id!;
      
      participants.forEach(async (participant: any) => {
        try {
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
              requirement: participant?.extra ?? null,
            })
            .select();
        } catch (participantError) {
          console.error("Error adding participant:", participantError);
        }
      });

      participantEmails?.forEach(async (email: string) => {
        try {
          const response = await fetch("/api/sendMail", {
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
        } catch (mailError) {
          console.error("Error sending email:", mailError);
        }
      });
    }

    if (eventType === "individual") {
      if (fileSubmission && file) {
        try {
          console.log(fileSubmission)
          console.log("Selected File:", file);
          const formData = new FormData();
          formData.append("file", file);
          formData.append(
            "folderName",
            eventResponse.data![0].event_name + " - " + "SUBMISSIONS"
          );

          const response:any = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
        const fileId = response;
        console.log(fileId);
        team.extra = {
          fileId
        }
          const result = await response.json();
          console.log(result);
        } catch (fileUploadError) {
          console.error("Error uploading file:", fileUploadError);
        }
      }

      const { data: individualData, error: individualError } = await supabase
        .from("teams")
        .insert({
          team_name: team.teamName,
          event_id: eventId,
          team_lead_id: user?.id,
          team_lead_email: user?.email,
        })
        .select();
      if (individualError) throw individualError;

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
          requirement: team?.extra ?? null,
        })
        .select();
      if (participantError) throw participantError;

      try {
        const response = await fetch("/api/sendMail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
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
      } catch (mailError) {
        console.error("Error sending email to team lead:", mailError);
      }
    }
  } catch (error) {
    console.error("Error in event registration:", error);
  }
};
