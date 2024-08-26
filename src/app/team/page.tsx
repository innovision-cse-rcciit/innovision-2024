import AllTeamCard from '@/components/team/AllTeamCard'
import TeamCard from '@/components/team/TeamCard'
import TeamHeading from '@/components/team/TeamHeading'
import React from 'react'

type Props = {}

const Team = (props: Props) => {
  return (
<>
   <div className="mx-auto min-h-screen max-w-full md:px-20 bg-black">
      <AllTeamCard />
    </div>
    </>
  )
}

export default Team