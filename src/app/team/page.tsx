import TeamCard from "@/components/team/TeamCard";
import React from "react";

const Gallery: React.FC = () => {
  const sampleData = [
    {name: "Dibakar", role: "Tech Team"},
    {name: "Dibakar", role: "Tech Team"},
    {name: "Dibakar", role: "Tech Team"},
    {name: "Dibakar", role: "Tech Team"},
    {name: "Dibakar", role: "Tech Team"},
    {name: "Dibakar", role: "Tech Team"},
  ]


  return (
    <div className="bg-black grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 p-5">
      {sampleData.map(({name, role}) => {
        return(
          <TeamCard name={name} role={role} />
        );
      })}
    </div>
  );
};

export default Gallery;
