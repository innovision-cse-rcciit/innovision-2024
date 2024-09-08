import { supabase } from "@/lib/supabase-client";
import { clearSpaces } from "./validateReg";
import { ContentType } from "../constants/wall-events";

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

      await Promise.all(
        participants.map(async (participant: any) => {
          try {
            await supabase.from("participants").insert({
              team_id: teamId,
              event_id: eventId,
              phone: clearSpaces(participant.phone).trim(),
              name: participant.name,
              email: participant.email,
              college_roll: clearSpaces(participant.roll).trim(),
              requirement: participant?.extra ?? null,
            });
          } catch (participantError) {
            console.error("Error adding participant:", participantError);
          }
        })
      );

      await Promise.all(
        participantEmails?.map(async (email: string) => {
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
        })
      );
    }

    if (eventType === "individual") {
      if (fileSubmission && file) {
        try {
          let foldername;
          switch (eventResponse.data![0].event_name) {
            case "The Wall : Article":
              foldername = ContentType.ARTICLE;
              break;
            case "The Wall : Poetry":
              foldername = ContentType.POETRY;
              break;
            case "The Wall: ArtWork":
              foldername = ContentType.ART;
              break;
            case "Shutterbugs":
              foldername = ContentType.SHUTTERBUGS;
              break;
            case "Reel-lens":
              foldername = ContentType.REELLENS;
              break;
            default:
              foldername = ContentType.ART;
              break;
          }

          // Upload files in parallel
          const fileUploadResults = await Promise.all(
            file?.map(async (f: any) => {
              const formData = new FormData();
              formData.append("file", f);
              formData.append("folderName", foldername);
              const mimeType = f.type.split("/")[1];
              formData.append("mimeType", mimeType);

              const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const result = await response.json();
              return result?.fileId;
            })
          );

          team.extra = {
            fileIds: fileUploadResults,
          };
          console.log("team.extra:", team.extra);
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
        } catch (fileUploadError) {
          console.error("Error uploading file:", fileUploadError);
        }
      }

      

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
