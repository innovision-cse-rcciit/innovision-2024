"use client";
import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import EventCategoryCard from "./EventCategoryCard";
import { getEventCategories } from "@/utils/functions/getEventCategories";

const Events = () => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const getEventDetails = async () => {
      const res = await getEventCategories();
      setEvents(res);
      console.log(events)
    };
    getEventDetails();
  }, []);
  return (
    <div
      className="py-10 relative w-full gap-10 flex flex-col items-center justify-center max-md:w-screen  bg-cover bg-center"
      // style={{ backgroundImage: "url('/home/events-bg.png')" }}
    >
      <Heading text="EVENTS" />
      <div className="flex flex-row flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
        {events.map((event: any) => {
          return <EventCategoryCard key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default Events;
