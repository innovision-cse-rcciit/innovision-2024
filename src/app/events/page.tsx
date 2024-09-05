"use client"
import React, { useEffect, useState } from 'react'
import FutureEventCard from '@/components/events/future/FutureEventCard'
import FutureEventsHeading from '@/components/events/future/FutureEventsHeading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { getAllEvents } from '@/utils/functions/getAllEvents';

interface Event {
  banner_url: string;
description: string;
event_category_id: string;
event_mode: string;
event_name: string;
id: string;
is_open: boolean;
max_team_size: number;
min_team_size: number;
rules: string;
schedule: string;
}

const Event = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]); 

  const fetchEvents = async () => {
    const events: Event[] = await getAllEvents(); 
    setAllEvents(events);
    console.log(events);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);  // Only one file can be selected
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log('Selected File:', selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folderName', 'ART');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      // Handle the upload status
    }
  };

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
              {allEvents.map((event, index) => (
                <FutureEventCard key={index} imageUrl={event.banner_url} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="non-technical">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {allEvents.map((event, index) => (
                <FutureEventCard key={index} imageUrl={event.banner_url} />
              ))}
            </div>
          </TabsContent>
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
