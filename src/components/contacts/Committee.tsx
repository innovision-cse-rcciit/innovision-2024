"use client";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { FadeIn } from "react-slide-fade-in";
import { CommitteeDetails } from "@/utils/constants/committee";


const Committee = () => {
  const [selected, setSelected] = useState(true);
  return (
    <div className="flex flex-col items-start font-retrolight mx-auto w-[90%] lg:w-1/2">

      <div className="rounded-md border border-pink-300 font-Chakra_Petch  bg-body w-full">
      <div className="flex flex-col items-center text-white relative justify-center gap-8 font-hollirood tracking-wider  px-5 py-10 lg:px-10 lg:py-10 lg:gap-12">
      {CommitteeDetails.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center gap-3 px-5 lg:gap-5"
          >
            <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={80 + index}
            >
              <h1 id="glow" className="text-primary mb-3 leading-loose text-center text-lg font-semibold tracking-wider lg:text-2xl">
                {item.title.toUpperCase()}
              </h1>
              <div className="flex flex-row flex-wrap items-center justify-center gap-8 lg:gap-20">
                {item.members.map((member, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row flex-wrap items-center gap-2 text-sm lg:text-xl"
                    >
                      <div className="flex flex-col items-center text-center">
                        <p className="font-semibold tracking-widest leading-loose">{member.name.toUpperCase()}</p>
                        <p className="tracking-widest leading-normal">{member.role}</p>
                        <a
                          href={`${member.phone?.includes('@') ? `mailto:${member.phone}` : `tel:${member.phone}`}`}
                          className="font-semibold hover:text-green-400 tracking-widest leading-loose"
                        >
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        );
      })}
    </div>
      </div>
    </div>
  );
};

export default Committee;