"use client";

import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import ParticipationTable from '@/components/dashboard/tables/ParticipationTable';
import { Role } from '@/lib/schema/add-coordinator-volunteer-schema';
import { EventMode } from '@/lib/schema/add-event-schema';
import { Coordinator, Event, Participant } from '@/utils/constants/admin-dashboard';
import { useUser } from '@/lib/store/user';
import { getAllEvents } from '@/utils/functions/getAllEvents';
import { getAllParticipants } from '@/utils/functions/getAllParticipants';
import { getAllCoordinators } from '@/utils/functions/getAllCoordinators';

type Params = {
    params: {
        eventid: string
    }
}

const EventDashboard = ({params: {eventid}}: Params) => {

    const user = useUser((state) => state);

    const [eventList, setEventList] = useState<Event[]>([]);
    const [participantList, setParticipantList] = useState<Participant[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<Coordinator[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(eventid)

    useEffect(() => {
        const fetchAllData = async () => {
            const events:any = await getAllEvents();
            setEventList(events);
            const participants = await getAllParticipants({ eventId: eventid });
            setParticipantList(participants as Participant[]);
            console.log(participantList)
            const coordinators = await getAllCoordinators({ eventId: eventid });
            setCoordinatorList(coordinators as unknown as Coordinator[]);
            console.log(coordinatorList)
        }
        fetchAllData();
        const admin = user.user?.roles.some((roleObj: any) => roleObj.role === "ADMIN");
        setIsAdmin(!!admin);
    }, [user])


    return (
        <>
            <div className="flex flex-col justify-center items-center gap-y-8 m-10">
                <h1 className='text-3xl font-Chakra_Petch font-semibold border-2 border-slate-500 p-2 rounded-2xl'>{isAdmin ? "Admin" : "Coordinator"} Dashboard</h1>
                {
                    isAdmin
                        ? <Dashboard
                            coordinatorList={coordinatorList}
                            participantList={participantList}
                            eventList={eventList}
                            isAdmin={isAdmin}
                        />
                        : <ParticipationTable
                            data={participantList}
                            isAdmin={isAdmin}
                        />
                }
            </div>
        </>
    )
}

export default EventDashboard