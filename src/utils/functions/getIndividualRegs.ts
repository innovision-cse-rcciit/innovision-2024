import { supabase } from "@/lib/supabase-client";
import { getUserInfo } from "./getUserInfo";

export const getIndividualRegs = async (phone: string) => {
  try {
    const registrationArray: any = [];
    const { data: participationData, error: participationError } =
      await supabase.from("participants").select("*").eq("phone", phone);

    const teamIds: any = participationData?.map(
      (participation: any) => participation.team_id,
    );
    console.log(teamIds)

    await Promise.all(
      teamIds.map(async (teamId: any) => {
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .select("*,participants(*),events(event_name)")
          .eq("team_id", teamId);
          registrationArray.push(teamData![0]);
      }),
     
    );

    return registrationArray;

  } catch (e) {
    console.error("Error:", e);
  }
};
