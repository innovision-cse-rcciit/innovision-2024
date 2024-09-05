import TeamWrapper from "@/components/team/TeamWrapper";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "INNOVISION 2K24 | Team",
  description: "INNOVISION  2K24 Organizing Team Description",
};

const TeamLayout = ({ children }: Props) => {
  return (
    <>
      <TeamWrapper>
        {children}
      </TeamWrapper>
    </>
  );
};

export default TeamLayout;