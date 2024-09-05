"use client";
import React, { use } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  team: {
    category: string;
    path: string;
  }
}

const TeamTab = ({team}: Props) => {

  const pathname = usePathname();
  return (
    <Link href={team.path} className="cursor-pointer">
      <Button
        className={`text-white px-5 md:px-7 lg:px-10 py-1 md:py-2 lg:py-3 font-retrolight font-semibold text-lg data-[state=active]:bg-[#B51C69] data-[state=active]:text-white hover:scale-95 hover:border-2 ${ pathname === team.path && 'border-yellow-300 border-2' }`}
      >
        {team.category}
      </Button>
    </Link>
  );
}

export default TeamTab