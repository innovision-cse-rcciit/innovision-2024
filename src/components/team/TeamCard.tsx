import Image from 'next/image'
import React from 'react'


const TeamCard = ({ name, role, imageUrl }: { name: string, role: string, imageUrl: string }) => {
  return (
    <div className='p-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 '>
      <div className='rounded-md w-[320px] h-[400px] flex flex-col items-center justify-center p-4 bg-zinc-900 sm:p-10'>
        <Image
          src={imageUrl}
          alt="image"
          width={200}
          height={200}
          style={{ objectFit: "cover", objectPosition: "0 10%" }}
          className="h-52 w-52 rounded-full object-cover border-4 border-regalia dark:border-zinc-900"
        //   onLoad={() => setLoaded(true)}
        />
        <p className="mb-2 mt-6 text-center tracking-widest text-base text-white dark:text-neutral-200 sm:text-xl font-Chakra_Petch font-semibold uppercase">
          {name}
        </p>

        <p className="text-md sm:text-lg text-center text-wrap text-neutral-300 font-Chakra_Petch tracking-widest dark:text-neutral-400">{role || "Member"}</p>
      </div>
    </div>
  )
}

export default TeamCard;