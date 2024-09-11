"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { getAllEvents } from "@/utils/functions/getAllEvents";
import EventCard from "@/components/events/EventCard";
import EventsHeading from "@/components/events/EventsHeading";
import Heading from "@/components/common/Heading";

const Event = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      const events: any = await getAllEvents();
      setAllEvents(events);
      // console.log(events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]); // Only one file can be selected
    }
  };




  return (
    <>
      <div
        className="flex flex-col items-center  py-4 bg-black w-full min-h-screen bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/MZ5HX7cL/events-bg.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
       <Heading text="EVENTS" />
        <Tabs defaultValue="technical" className="w-full mt-5">
          <div className="flex justify-center w-full pb-12">
            <TabsList className="grid font-Chakra_Petch w-11/12 md:w-3/4 xl:w-1/2 grid-cols-3 font-semibold rounded-3xl h-14 bg-[#FFFFFF1A]">
              <TabsTrigger
                value="technical"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] lg:text-xl font-semibold data-[state=active]:text-white rounded-3xl"
              >
                TECHNICAL
              </TabsTrigger>
              <TabsTrigger
                value="gaming"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] lg:text-xl font-semibold data-[state=active]:text-white rounded-3xl"
              >
                GAMING
              </TabsTrigger>
              <TabsTrigger
                value="non-technical"
                className="h-12 text-white data-[state=active]:bg-[#B51C69] lg:text-xl font-semibold data-[state=active]:text-white rounded-3xl"
              >
                NON-TECHNICAL
              </TabsTrigger>
            </TabsList>
          </div>
          {loading ? (
            <div className="flex flex-col items-center w-full justify-center mx-auto mt-10">
              <ClipLoader size={40} color="white" />
            </div>
          ) : (
            <>
              <TabsContent value="technical">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
                  {allEvents
                    .filter(
                      (event: any) =>
                        event.event_categories?.title == "TECHNICAL"
                    )
                    .map((event: any, index: number) => (
                      <EventCard key={index} event={event} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="gaming">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
                  {allEvents
                    .filter(
                      (event: any) => event.event_categories?.title == "GAMING"
                    )
                    .map((event: any, index: number) => (
                      <EventCard key={index} event={event} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="non-technical">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
                  {allEvents
                    .filter(
                      (event: any) =>
                        event.event_categories?.title == "NON-TECHNICAL"
                    )
                    .map((event: any, index: number) => (
                      <EventCard key={index} event={event} />
                    ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>

      {/* Upload Section */}
      {/* <div>
        <input type="file" accept='image/*' onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div> */}
    </>
  );
};

export default Event;
