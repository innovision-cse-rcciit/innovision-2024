import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryHeading from "@/components/gallery/GalleryHeading";
import { sampleData } from "@/utils/constants/gallery";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-col items-center py-4 bg-black w-full min-h-screen bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/MZ5HX7cL/events-bg.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <GalleryHeading />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 p-4">
        {sampleData.map((data, index) => (
          <GalleryCard key={index} image={data.image} />
        ))}
      </div>
      </div>
    </>
  );
};

export default Gallery;
