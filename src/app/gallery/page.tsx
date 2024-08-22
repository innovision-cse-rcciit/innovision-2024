import Image from "next/image";
import React from "react";

const Gallery: React.FC = () => {
  return (
    <div className="bg-purple-800 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-6xl font-Chakra_Petch">GALLERY</h1>
        <a
          href="#"
          className="bg-white text-purple-800 px-4 py-2 font-Chakra_Petch rounded-md">
          EXPLORE →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-black aspect-square "></div>
        <div className="bg-black aspect-square"></div>
        <div className="bg-black aspect-square col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-1"></div>
        <div className="bg-black aspect-square mx-auto pt-"></div>
        <div className="flex flex-col gap-y-4 ">
          <div className="bg-black aspect-square"></div>
          <div className="bg-black aspect-square"></div>
        </div>
        <div className="bg-black aspect-square col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2"></div>
        <div className="flex flex-col gap-y-4 ">
          <div className="bg-black aspect-square"></div>
          <div className="bg-black aspect-square"></div>
        </div>
        <div className="bg-black aspect-square col-span-2 md:col-span-1 lg:col-span-1"></div>
        <div className="bg-black aspect-square"></div>
        <div className="bg-black aspect-square col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-1"></div>
        <div className="bg-black aspect-square"></div>
        <div className="flex flex-col gap-y-4 ">
          <div className="bg-black aspect-square"></div>
          <div className="bg-black aspect-square"></div>
        </div>
        <div className="bg-black aspect-square col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2"></div>
        <div className="flex flex-col gap-y-4 ">
          <div className="bg-black aspect-square"></div>
          <div className="bg-black aspect-square"></div>
        </div>
        <div className="bg-black aspect-square col-span-2 md:col-span-1 lg:col-span-1"></div>
        <div className="bg-black aspect-square"></div>
        <div className="bg-black aspect-square col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-1"></div>
        <div className="bg-black aspect-square"></div>
      </div>
    </div>
  );
};

export default Gallery;
