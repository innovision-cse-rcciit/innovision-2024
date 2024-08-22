"use client"
import FutureEventCard from '@/components/events/future/FutureEventCard'
import FutureEventsHeading from '@/components/events/future/FutureEventsHeading'
import React from 'react'

const Event = () => {
    const cardsData = [
        { date: '02.09.2024', title: 'WEBIFY' },
        { date: '03.09.2024', title: 'CODATHON' },
        { date: '04.09.2024', title: 'HACKATHON' },
        { date: '04.09.2024', title: 'BAG' },
      ];
    
  return (
    <>
   <div className="mx-auto min-h-screen max-w-full md:px-20 bg-black">
   <div className="relative w-full ">
      <div className="mx-auto max-w-full flex flex-col gap-10">
        <FutureEventsHeading />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardsData.map((card, index) => (
            <FutureEventCard key={index} date={card.date} title={card.title} />
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Event