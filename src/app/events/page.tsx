"use client"
import React, { useState } from 'react'
import FutureEventCard from '@/components/events/future/FutureEventCard'
import FutureEventsHeading from '@/components/events/future/FutureEventsHeading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { uploadToGoogleDrive } from '@/utils/functions/wallPicUpload'

const Event = () => {
  const cardsData = [
    { date: '02.09.2024', title: 'WEBIFY' },
    { date: '03.09.2024', title: 'CODATHON' },
    { date: '04.09.2024', title: 'HACKATHON' },
    { date: '04.09.2024', title: 'BAG' },
  ];


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

      const response = await fetch('/api/upload',
        {
          method: 'POST',
          body: formData,
        });

      const result = await response.json();
      console.log(result);
      // try {
      //   setUploadStatus(`File uploaded successfully with ID: ${fileId}`);
      // } catch (error) {
      //   setUploadStatus('Failed to upload file');
      // }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 bg-black">
        <FutureEventsHeading />
        <Tabs defaultValue="technical" className="w-full">
          <div className="flex justify-center w-full pb-12">
            <TabsList className="grid w-3/4 xl:w-1/2 grid-cols-2 rounded-3xl h-14 bg-[#FFFFFF1A]">
              <TabsTrigger value="technical" className='h-12 text-white data-[state=active]:bg-[#B51C69] data-[state=active]:text-white rounded-3xl'>Technical</TabsTrigger>
              <TabsTrigger value="non-technical" className='h-12 text-white data-[state=active]:bg-[#B51C69] data-[state=active]:text-white rounded-3xl'>Non-Technical</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="technical">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {cardsData.map((card, index) => (
                <FutureEventCard key={index} date={card.date} title={card.title} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="non-technical">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
              {cardsData.map((card, index) => (
                <FutureEventCard key={index} date={card.date} title={card.title} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <input type="file" accept='image/*' onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </>
  )
}

export default Event
