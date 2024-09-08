"use client";


import Heading from "@/components/common/Heading";
import Committee from "@/components/contacts/Committee";
import React from "react";

const page = () => {
  return (
    <div
    className="w-full min-h-screen bg-no-repeat bg-center bg-cover"
    style={{ backgroundImage: "url('https://i.postimg.cc/MZ5HX7cL/events-bg.png')" }}
    >
      <div className="mx-auto py-10 flex w-full flex-col items-center gap-5">
        <Heading text="Contact Us" />
        <Committee />
      </div>
    </div>
  );
};

export default page;