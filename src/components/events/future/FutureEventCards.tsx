import React from 'react';
import FutureEventsHeading from './FutureEventsHeading';
import FutureEventCard from './FutureEventCard';


const FutureEventCards = () => {
  const cardsData = [
    { date: '02.09.2024', title: 'WEBIFY' },
    { date: '03.09.2024', title: 'CODATHON' },
    { date: '04.09.2024', title: 'HACKATHON' },
    { date: '04.09.2024', title: 'BAG' },
  ];

  return (
    <div className="relative w-full lg:mt-10">
      <div className="mx-auto max-w-full flex flex-col gap-10">
        <FutureEventsHeading />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardsData.map((card, index) => (
            <FutureEventCard key={index} date={card.date} title={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureEventCards;
