"use client";
import React from "react";
import FutureEventCard from "@/components/events/future/FutureEventCard";
import FutureEventsHeading from "@/components/events/future/FutureEventsHeading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const Event = () => {
  const cardsData = [
    { date: "02.09.2024", title: "WEBIFY" },
    { date: "03.09.2024", title: "CODATHON" },
    { date: "04.09.2024", title: "HACKATHON" },
    { date: "04.09.2024", title: "BAG" },
  ];

  return (
    <>
      <div
        className="flex flex-col items-center  py-4 bg-black w-full bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/home/events-bg.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <FutureEventsHeading />
        <Tabs defaultValue="technical" className="w-full">
          <div className="flex justify-center w-full pb-12">
            <TabsList className="grid w-3/4 xl:w-1/2 grid-cols-3 rounded-3xl h-14 bg-[#FFFFFF1A]">
              <TabsTrigger
                value="technical"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] data-[state=active]:text-white rounded-3xl"
              >
                Technical
              </TabsTrigger>
              <TabsTrigger
                value="gaming"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] data-[state=active]:text-white rounded-3xl"
              >
                Gaming
              </TabsTrigger>
              <TabsTrigger
                value="non-technical"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] data-[state=active]:text-white rounded-3xl"
              >
                Non-Technical
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="technical">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {cardsData.map((card, index) => (
                <FutureEventCard
                  key={index}
                  date={card.date}
                  title={card.title}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="gaming">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {cardsData.map((card, index) => (
                <FutureEventCard
                  key={index}
                  date={card.date}
                  title={card.title}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="non-technical">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {cardsData.map((card, index) => (
                <FutureEventCard
                  key={index}
                  date={card.date}
                  title={card.title}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Event;
