"use client"
import { useUser } from '@/lib/store/user';
import { supabase } from '@/lib/supabase-client';
import React, { useEffect, useState } from 'react'
import { getAllEvents } from '@/utils/functions/getAllEvents';
import { ClipLoader } from 'react-spinners';
import EventDashboardCard from '@/components/dashboard/events/EventDashboardCard';

const CoordinatorList = () => {
    const user = useUser((state) => state.user);
    const [loading, setLoading] = useState(true);
    const [coordinatingEvents, setCoordinatingEvents] = useState<any>([]);

    useEffect(() => {
        const getCoordinatingEvents = async () => {
            const { data } = await supabase.auth.getSession();
            const { data: roleData }: any = await supabase
                .from("roles")
                .select(
                    "role,event_id"
                )
                .eq("id", data?.session?.user.id);
            const events: any = await getAllEvents();
            console.log(events)

            let showAllEvents = false;
            let coordinatingEventIds: any = [];

            if (roleData) {
                for (const obj of roleData!) {
                    if (obj.role === "ADMIN") {
                        showAllEvents = true;
                        break;
                    }
                    if (obj.role === "COORDINATOR") {
                        coordinatingEventIds.push(obj.event_id);
                    }
                }
            }

            let filteredEvents: any = [];
            if (showAllEvents) {
                filteredEvents = events;
            } else {
                filteredEvents = (events).filter((event: any) => {
                    return coordinatingEventIds.includes(event.id);
                });
            }

            setCoordinatingEvents(filteredEvents);
            setLoading(false);
        };

        getCoordinatingEvents();
    }, [user]);

    return (
        <div className="px-5 py-10 flex w-full flex-col items-center justify-center gap-10 bg-black">
            <div className='text-white text-3xl keania-one-regular'>
                Management Dashboard
            </div>
            <div className="flex h-full min-h-[60vh] flex-row flex-wrap items-center justify-center gap-20 mb-10">
                {loading ? (
                    <div className=" flex flex-col items-center justify-center">
                        <ClipLoader size={24} color="#000" />{" "}
                    </div>
                ) : (
                    coordinatingEvents?.map((event: any, index: number) => {
                        return (
                            <EventDashboardCard key={index} event={event} />
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default CoordinatorList
