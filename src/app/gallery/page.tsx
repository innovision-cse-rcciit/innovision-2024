import GalleryCard from "@/components/gallery/GalleryCard";
import { sampleData } from "@/utils/constants/gallery";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <div className="bg-black grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 p-4">
      {sampleData.map((data, index) => (
        <GalleryCard key={index} image={data.image} />
      ))}
    </div>
  );
};

export default Gallery;
