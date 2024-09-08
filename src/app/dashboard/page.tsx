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

type Props = {}

// const coordinatorList: Coordinator[] = [
//     {
//         id: "m5gr84i9",
//         name: "Ken Johnson",
//         email: "ken99@yahoo.com",
//         event: "Hackathon 2024",
//         type: Role.COORDINATOR,
//     },
//     {
//         id: "3u1reuv4",
//         name: "Abe Smith",
//         email: "Abe45@gmail.com",
//         event: "Hackathon 2024",
//         type: Role.COORDINATOR,
//     },
//     {
//         id: "derv1ws0",
//         name: "Monserrat Jones",
//         email: "Monserrat44@gmail.com",
//         event: "Tech Conference",
//         type: Role.COORDINATOR,
//     },
//     {
//         id: "5kma53ae",
//         name: "Silas Green",
//         email: "Silas22@gmail.com",
//         event: "Tech Conference",
//         type: Role.VOLUNTEER,
//     },
//     {
//         id: "bhqecj4p",
//         name: "Carmella Davis",
//         email: "carmella@hotmail.com",
//         event: "Startup Summit",
//         type: Role.VOLUNTEER,
//     },
//     {
//         id: "7kl12abc",
//         name: "Alex Turner",
//         email: "alex.turner@gmail.com",
//         event: "Startup Summit",
//         type: Role.VOLUNTEER,
//     },
//     {
//         id: "x8y9z4w2",
//         name: "Taylor Swift",
//         email: "taylor.swift@music.com",
//         event: "Music Festival",
//         type: Role.VOLUNTEER,
//     },
//     {
//         id: "y2z7x9q5",
//         name: "Chris Evans",
//         email: "chris.evans@marvel.com",
//         event: "Comic-Con",
//         type: Role.COORDINATOR,
//     },
//     {
//         id: "p3r5t6u7",
//         name: "John Doe",
//         email: "johndoe@example.com",
//         event: "Tech Fair",
//         type: Role.COORDINATOR,
//     },
//     {
//         id: "a1s2d3f4",
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         event: "Tech Fair",
//         type: Role.VOLUNTEER,
//     }
// ];

// const participantList: Participant[] = [
//     {
//         id: "p1a2b3c4",
//         name: "John Doe",
//         email: "johndoe@example.com",
//         event: "Hackathon 2024",
//     },
//     {
//         id: "p5d6e7f8",
//         name: "Jane Smith",
//         email: "janesmith@example.com",
//         event: "Hackathon 2024",
//     },
//     {
//         id: "g9h0i1j2",
//         name: "Emily Davis",
//         email: "emilydavis@example.com",
//         event: "Tech Conference",
//     },
//     {
//         id: "k3l4m5n6",
//         name: "Michael Brown",
//         email: "michaelbrown@example.com",
//         event: "Tech Conference",
//     },
//     {
//         id: "o7p8q9r1",
//         name: "Sarah Johnson",
//         email: "sarahjohnson@example.com",
//         event: "Startup Summit",
//     },
//     {
//         id: "s2t3u4v5",
//         name: "David Lee",
//         email: "davidlee@example.com",
//         event: "Startup Summit",
//     },
//     {
//         id: "w6x7y8z9",
//         name: "Sophia Wilson",
//         email: "sophiawilson@example.com",
//         event: "Music Festival",
//     },
//     {
//         id: "a0b1c2d3",
//         name: "James Anderson",
//         email: "jamesanderson@example.com",
//         event: "Music Festival",
//     },
//     {
//         id: "e4f5g6h7",
//         name: "Olivia Martinez",
//         email: "oliviamartinez@example.com",
//         event: "Comic-Con",
//     },
//     {
//         id: "i8j9k0l1",
//         name: "Benjamin Hernandez",
//         email: "benjaminhernandez@example.com",
//         event: "Comic-Con",
//     },
//     {
//         id: "m2n3o4p5",
//         name: "Charlotte White",
//         email: "charlottewhite@example.com",
//         event: "Tech Fair",
//     },
//     {
//         id: "q6r7s8t9",
//         name: "Daniel Garcia",
//         email: "danielgarcia@example.com",
//         event: "Tech Fair",
//     },
//     {
//         id: "u0v1w2x3",
//         name: "Lily Moore",
//         email: "lilymoore@example.com",
//         event: "Startup Summit",
//     },
//     {
//         id: "y4z5a6b7",
//         name: "Ethan Taylor",
//         email: "ethantaylor@example.com",
//         event: "Hackathon 2024",
//     },
//     {
//         id: "c8d9e0f1",
//         name: "Ava Thomas",
//         email: "avathomas@example.com",
//         event: "Tech Conference",
//     },
//     {
//         id: "g2h3i4j5",
//         name: "William Jackson",
//         email: "williamjackson@example.com",
//         event: "Tech Fair",
//     },
//     {
//         id: "k6l7m8n9",
//         name: "Isabella Martin",
//         email: "isabellamartin@example.com",
//         event: "Music Festival",
//     },
//     {
//         id: "o0p1q2r3",
//         name: "Lucas Thompson",
//         email: "lucasthompson@example.com",
//         event: "Comic-Con",
//     },
//     {
//         id: "s4t5u6v7",
//         name: "Mia Robinson",
//         email: "miarobinson@example.com",
//         event: "Tech Conference",
//     },
//     {
//         id: "w8x9y0z1",
//         name: "Henry Clark",
//         email: "henryclark@example.com",
//         event: "Hackathon 2024",
//     },
// ];

// const eventList: Event[] = [
//     {
//         id: "e1a2b3c4",
//         name: "Hackathon 2024",
//         type: EventMode.ONLINE,
//         duration: "48 hours",
//         isOpen: true,
//     },
//     {
//         id: "e5d6e7f8",
//         name: "Tech Conference",
//         type: EventMode.OFFLINE,
//         duration: "3 days",
//         isOpen: true,
//     },
//     {
//         id: "g9h0i1j2",
//         name: "Startup Summit",
//         type: EventMode.ONLINE,
//         duration: "2 days",
//         isOpen: false,
//     },
//     {
//         id: "k3l4m5n6",
//         name: "Music Festival",
//         type: EventMode.OFFLINE,
//         duration: "1 day",
//         isOpen: true,
//     },
//     {
//         id: "o7p8q9r1",
//         name: "Comic-Con",
//         type: EventMode.OFFLINE,
//         duration: "4 days",
//         isOpen: false,
//     },
//     {
//         id: "s2t3u4v5",
//         name: "Tech Fair",
//         type: EventMode.ONLINE,
//         duration: "5 hours",
//         isOpen: true,
//     },
//     {
//         id: "w6x7y8z9",
//         name: "Developer Meetup",
//         type: EventMode.OFFLINE,
//         duration: "8 hours",
//         isOpen: true,
//     },
//     {
//         id: "a0b1c2d3",
//         name: "Product Launch",
//         type: EventMode.ONLINE,
//         duration: "3 hours",
//         isOpen: true,
//     },
//     {
//         id: "e4f5g6h7",
//         name: "Cybersecurity Workshop",
//         type: EventMode.OFFLINE,
//         duration: "6 hours",
//         isOpen: false,
//     },
//     {
//         id: "i8j9k0l1",
//         name: "AI Symposium",
//         type: EventMode.ONLINE,
//         duration: "2 days",
//         isOpen: true,
//     },
//     {
//         id: "m2n3o4p5",
//         name: "Blockchain Expo",
//         type: EventMode.OFFLINE,
//         duration: "2 days",
//         isOpen: false,
//     },
//     {
//         id: "q6r7s8t9",
//         name: "Digital Marketing Webinar",
//         type: EventMode.ONLINE,
//         duration: "4 hours",
//         isOpen: true,
//     },
//     {
//         id: "u0v1w2x3",
//         name: "Gaming Convention",
//         type: EventMode.OFFLINE,
//         duration: "3 days",
//         isOpen: true,
//     },
//     {
//         id: "y4z5a6b7",
//         name: "Virtual Reality Expo",
//         type: EventMode.OFFLINE,
//         duration: "2 days",
//         isOpen: false,
//     },
//     {
//         id: "c8d9e0f1",
//         name: "Cloud Computing Conference",
//         type: EventMode.ONLINE,
//         duration: "1 day",
//         isOpen: true,
//     },
//     {
//         id: "g2h3i4j5",
//         name: "Open Source Summit",
//         type: EventMode.OFFLINE,
//         duration: "3 days",
//         isOpen: true,
//     },
//     {
//         id: "k6l7m8n9",
//         name: "UX/UI Design Workshop",
//         type: EventMode.ONLINE,
//         duration: "5 hours",
//         isOpen: false,
//     },
//     {
//         id: "o0p1q2r3",
//         name: "Robotics Expo",
//         type: EventMode.OFFLINE,
//         duration: "2 days",
//         isOpen: true,
//     },
//     {
//         id: "s4t5u6v7",
//         name: "Data Science Bootcamp",
//         type: EventMode.ONLINE,
//         duration: "7 days",
//         isOpen: false,
//     },
//     {
//         id: "w8x9y0z1",
//         name: "Augmented Reality Workshop",
//         type: EventMode.ONLINE,
//         duration: "6 hours",
//         isOpen: true,
//     },
// ];

const AdminPage = (props: Props) => {

    const user = useUser((state) => state);

    const [eventList, setEventList] = useState<Event[]>([]);
    const [participantList, setParticipantList] = useState<Participant[]>([]);
    const [coordinatorList, setCoordinatorList] = useState<Coordinator[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            const events:any = await getAllEvents();
            setEventList(events);
            const participants = await getAllParticipants({ eventId: null });
            setParticipantList(participants as Participant[]);
            console.log(participantList)
            const coordinators = await getAllCoordinators({ eventId: null });
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

export default AdminPage