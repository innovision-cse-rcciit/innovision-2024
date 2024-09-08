import Image from "next/image";
import React from "react";

interface GalleryCardProps {
  image: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image }) => {
  return (
    <div className="p-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
      <div className="bg-black rounded-md">
        <div className="flex flex-col items-center">
          <Image alt="" width={500} height={200} src={image} className="w-full h-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
