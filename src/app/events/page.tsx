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
      <div className="flex flex-col items-center py-4 bg-black">
        {/* <img src='/events/Events_bg_all.png' className='h-screen w-screen object-cover' /> */}
        <FutureEventsHeading />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 px-4">
          {cardsData.map((card, index) => (
            <FutureEventCard key={index} date={card.date} title={card.title} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Event
