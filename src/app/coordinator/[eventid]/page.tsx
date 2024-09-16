"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import ParticipationTable from "@/components/dashboard/tables/ParticipationTable";
import { Role } from "@/lib/schema/add-coordinator-volunteer-schema";
import { EventMode } from "@/lib/schema/add-event-schema";
import {
  Coordinator,
  Event,
  Participant,
} from "@/utils/constants/admin-dashboard";
import { useUser } from "@/lib/store/user";
import { getAllCoordinators } from "@/utils/functions/getAllCoordinators";
import { getAllEventsAdmin } from "@/utils/functions/getAllEventsAdmin";
import { getParticipations } from "@/utils/functions/getParticipations";
import { ClipLoader } from "react-spinners";

type Params = {
  params: {
    eventid: string;
  };
};

const EventDashboard = ({ params: { eventid } }: Params) => {
  const user = useUser((state) => state);
  const [loading, setLoading] = useState(true);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [participantList, setParticipantList] = useState<Participant[]>([]);
  const [coordinatorList, setCoordinatorList] = useState<Coordinator[]>([]);
  const [participantsData, setParticipantsData] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCoordinator, setIsCoordinator] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const participants = await getParticipations(eventid);
      setParticipantsData(participants);
    };
    getData();
  }, [eventid]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const events: any = await getAllEventsAdmin();
      setEventList(events);

      const coordinators = await getAllCoordinators({ eventId: eventid });
      setCoordinatorList(coordinators as unknown as Coordinator[]);
      setLoading(false);
    };
    fetchAllData();
    const admin = user.user?.roles.some(
      (roleObj: any) => roleObj.role === "ADMIN"
    );
    const coordinator = user.user?.roles.some(
      (roleObj: any) => roleObj.role === "COORDINATOR"
    );
    setIsAdmin(!!admin);
    setIsCoordinator(!!coordinator);
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-y-8 m-10">
        {loading ? (
          <div className="flex flex-col min-h-[80vh] items-center justify-center mx-auto w-full">
            <ClipLoader color="#000" loading={loading} size={100} />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-Chakra_Petch font-semibold border-2 border-slate-500 p-2 rounded-2xl">
              {isAdmin
                ? isCoordinator
                  ? `${participantsData[0]?.event_name} : Participants`
                  : "Admin"
                : "Coordinator"}{" "}
              Dashboard
            </h1>

            {isAdmin ? (
              <Dashboard
                coordinatorList={coordinatorList}
                participantList={participantsData}
                eventList={eventList}
                isAdmin={isAdmin}
                isCoordinator={isCoordinator}
              />
            ) : (
              <ParticipationTable
                data={participantsData}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default EventDashboard;
