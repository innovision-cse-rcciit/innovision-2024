"use client";

import { useUser } from "@/lib/store/user";
import { supabase } from "@/lib/supabase-client";
import { getIndividualRegs } from "@/utils/functions/getIndividualRegs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import Heading from "../common/Heading";
import EventRegCard from "./EventRegCard";

const Page = () => {
  const [teamData, setTeamData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<string>("");
  const user = useUser((state: any) => state.user);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const data = await getIndividualRegs(user?.email!);
      const { data: userData, error } = await supabase.auth.getSession();
      setUserImage(userData?.session?.user?.user_metadata?.avatar_url!);
      setTeamData(data);
      setLoading(false);
    };
    getData();
  }, [user]);

  return (
    <>
      <div
        className="flex py-10 text-white min-h-[80vh] bg-cover w-full h-full  bg-no-repeat flex-col items-center gap-5 px-2 lg:px-10"
        style={{ background: 'url("/events/Background-img.png")' }}
      >
        <Heading text="Registrations" />
        <div className="flex flex-row flex-wrap items-center justify-evenly gap-5 text-center font-Chakra_Petch  md:gap-8 text-lg lg:text-2xl xl:gap-20">
          <h1>
            <span id="glow">Name : </span>
            {user?.name.toUpperCase()}
          </h1>
          <h1>
            <span id="glow">Email : </span>
            {user?.email}
          </h1>
          <h1>
            <span id="glow">Phone: </span>
            {user?.phone}
          </h1>
          <Link
            href={"/profile/edit"}
            className="flex flex-row bg-transparent items-center hover:opacity-90 relative"
          >
            <Image
              width={112}
              height={110}
              alt="Register"
              src="https://i.postimg.cc/kXR0L9dy/Button.png"
              className="w-40 md:w-48"
            />
            <h1 className="absolute text-center w-full font-Chakra_Petch text-[#B61B69] text-sm md:text-xl font-bold">
              EDIT PROFILE
            </h1>
          </Link>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-20 lg:w-[80%]">
          {loading ? (
            <div className="mx-auto flex min-h-[80vh] w-full flex-col items-center justify-center">
              <PuffLoader color="" size={30} />
            </div>
          ) : teamData?.length > 0 ? (
            teamData?.map((team: any, index: number) => {
              return (
                <>
                  <EventRegCard key={index} teams={team} />
                </>
              );
            })
          ) : (
            <div className="justfiy-center mx-auto mt-20 flex flex-col items-center gap-5 font-hollirood">
              <h1 className="text-xl font-semibold">No Registrations Yet !</h1>
              {/* <EventButton
                name="Register"
                onClick={() => {
                  router.push("/events");
                }}
              /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
