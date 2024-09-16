import React from "react";
import Image from "next/image";
import { useCurrentDateTime } from "@/utils/functions/dateTime";
import Link from "next/link";
import { FadeIn } from "react-slide-fade-in";
import { FaDiscord } from "react-icons/fa";

const LandingPage = () => {
  const { day, month, year, hours, minutes } = useCurrentDateTime();
  const timeDigits = [hours[0], hours[1], ":", minutes[0], minutes[1]];

  return (
    <div
      className="relative w-full h-screen max-md:w-screen max-md:h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Landing/Future_landing_page.png')" }}
    >
      <div className="flex items-center justify-center my-auto mx-auto h-full">
        <div className="rounded-xl backdrop-blur-sm flex flex-col xl:flex-row md:pt-10 hover:backdrop-blur-none cursor-pointer  border-2 border-white w-[90%]  md:w-4/5 h-auto md:h-4/5 lg:h-[90%] 2xl:h-5/6 transform -translate-y-1/6 gap-4 items-center justify-around  ">
          <div className="absolute left-10 top-10 max-md:hidden">
            <Image height={40} width={40} src="/Landing/arrow.png" alt="Logo" />
          </div>
          <FadeIn
              from="left"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={80}
            >
                 <Image
            height={400}
            width={450}
            src="https://i.postimg.cc/JnPs7b2s/Innovision-logo-landing.png"
            className=" max-md:w-80 max-md:h-42 md:w-72 md:h-56 xl:w-80 xl:h-68 2xl:w-96 2xl:h-80 avatar"
            alt="Logo"
          />
              </FadeIn>
       
          <div className="flex flex-col gap-4 items-center">
            <div className="bg-white px-10 py-2 border rounded-xl">
              <h1 className="keania-one-regular text-2xl md:text-4xl lg:text-6xl 2xl:text-6xl text-[#B61B69]">
                INNOVISION 2024
              </h1>
            </div>
            <div className="flex flex-col  items-center lg:items-end px-5">
              <h1 className="text-white font-semibold text-md md:text-xl text-center">
                THE ANNUAL DEPARTMENTAL FEST OF CSE DEPARTMENT
              </h1>
              <h1 className="text-white font-semibold text-md md:text-xl text-center">(NBA ACCREDITED)</h1>
              <Link target="_blank" href="https://discord.gg/EHYzPJeYAK">
        <FaDiscord size={30} color="white" />
        </Link>
              <Link href={"/events"}>
                <button className="flex mt-2 mx-auto w-full flex-row bg-transparent items-center hover:opacity-90 relative">
                  <Image
                    width={112}
                    height={110}
                    alt="Register"
                    src="https://i.postimg.cc/kXR0L9dy/Button.png"
                    className="w-32 h-15 md:w-44"
                  />
                  <h1 className="absolute text-center w-full font-Chakra_Petch text-[#B61B69] text-sm md:text-lg font-bold">
                    REGISTER NOW
                  </h1>
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense mx-auto w-full justify-center  items-center">
            <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={81}
            >
              <Link
                href={"https://www.education.gov.in/"}
                className="flex items-center lg:items-end px-5"
              >
                <button className="flex flex-row bg-transparent items-center hover:opacity-90 relative">
                  <Image
                    width={200}
                    height={110}
                    alt="Register"
                    src="https://i.postimg.cc/JzyBVdSr/logo.jpg"
                 
                  />
                </button>
              </Link>
              </FadeIn>
              <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={82}
            >
              <Link
                href={"https://www.aicte-india.org/"}
                className="flex items-center lg:items-end px-5"
              >
                <button className="flex flex-row justify-center mx-auto bg-transparent items-center hover:opacity-90 relative">
                  <Image
                    width={80}
                    height={110}
                    alt="Register"
                    src="https://i.postimg.cc/MT0Q3MN1/aicte.jpg"
                
                  />
                </button>
              </Link>
              </FadeIn>
              <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={83}
            >
              <Link
                href={"https://iic.mic.gov.in/login"}
                className="flex items-center lg:items-end px-5"
              >
                <button className="flex flex-row bg-white bg-transparent items-center hover:opacity-90 relative">
                  <Image
                    width={200}
                    height={110}
                    alt="Register"
                    src="https://i.postimg.cc/jSM0PtXc/iic.png"
                
                  />
                </button>
              </Link>
              </FadeIn>
              <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={84}
            >
              <Link
                href={"https://rcciit.org/"}
                className="flex items-center lg:items-end px-5"
              >
                <button className="flex flex-row bg-transparent items-center hover:opacity-90 relative">
                  <Image
                    width={200}
                    height={110}
                    alt="Register"
                    src="https://i.postimg.cc/CMnYpbGD/rcciit.png"
                  />
                </button>
              </Link>
              </FadeIn>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <div className="flex flex-row items-center justify-center">
                {timeDigits.map((digit, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center"
                  >
                    <Image
                      width={100}
                      height={100}
                      src={
                        digit === ":"
                          ? "/Landing/Time-asset-colon.svg"
                          : `/Landing/Time-asset-1.svg`
                      }
                      className={
                        digit === ":"
                          ? "h-6 mt-2 xl:h-8 xl:mt-2 "
                          : `h-10 md:h-12 xl:h-16 ${
                              index % 2 === 0 ? "" : "transform rotate-180"
                            }`
                      }
                      alt={`time-${digit}`}
                    />
                    <h1
                      className={`${
                        digit === ":" ? "text-white" : "text-[#B51C69]"
                      } absolute text-[#B51C69] text-xl md:text-2xl keania-one-regular`}
                    >
                      {digit === ":" ? "" : digit}
                    </h1>
                  </div>
                ))}
              </div>
              <div className="text-[#DAD7D9] text-2xl lg:text-3xl keania-one-regular">
                18th - 19th September 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
