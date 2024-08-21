import React from 'react';
import './FutureEventCard.css';

const FutureEventCard = ({ date, title }:{
    date: string;
    title: string;
}) => {
    return (
        <div className="relative border border-black p-4 w-full max-w-xs mx-auto future-event-card">
            <div className="absolute top-2 left-4 text-base font-Chakra_Petch font-semibold">{title}</div>
            <div className="absolute top-3 right-2 text-xs font-Chakra_Petch font-semibold">{date}</div>
            <div className="mt-8 w-full h-40 bg-black transition-transform duration-300 ease-in-out transform hover:scale-100"></div>
        </div>
    );
};

export default FutureEventCard;
