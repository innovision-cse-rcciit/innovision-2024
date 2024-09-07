import { teams } from '@/utils/constants/team';
import React from 'react'
import TeamTab from './TeamTab';

type Props = {
  children: React.ReactNode
}

const TeamWrapper = ({children}: Props) => {
  return ( 
    <div className="mx-auto flex flex-col items-center gap-5 scroll-smooth bg-black">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 mb-5 mx-auto text-white font-Chakra_Petch text-4xl font-bold text-regalia max-w-xl text-wrap">
          Organizing Team
          {/* <span className=" font-Chakra_Petch text-white"> INNOVISION 2024</span> */}
        </div>
      </div>
      <div className="mx-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6 ">
        {teams.map((teamItem, index) => (
          <TeamTab key={index} team={teamItem} />
        ))}
      </div>
      <div className='mb-4'>{children}</div>
    </div>
  );
}

export default TeamWrapper