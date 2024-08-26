import React from 'react'
import TeamHeading from './TeamHeading'
import TeamCard from './TeamCard'

const AllTeamCard = () => {
    const cardsData = [
    {name : "Bagh", role : "Web Developer"},
    {name : "Bagh", role : "Web Developer"},
    {name : "Bagh", role : "Web Developer"},
    {name : "Bagh", role : "Web Developer"},
    {name : "Bagh", role : "Web Developer"},
      ];
  return (
    <div className="relative w-full ">
    <div className="mx-auto max-w-full flex flex-col gap-10">
      <TeamHeading />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardsData.map((card, index) => (
          <TeamCard key={index} Name={card.name} Role={card.role} />
        ))}
      </div>
    </div>
  </div>
  )
}

export default AllTeamCard