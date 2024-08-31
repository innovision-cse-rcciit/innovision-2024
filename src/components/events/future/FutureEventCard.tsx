import React from 'react';
import './FutureEventCard.css';

const FutureEventCard = ({ date, title }: {
    date: string;
    title: string;
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative border border-black p-8 w-full max-w-xs mx-auto future-event-card ${isHovered ? 'hovered' : ''}`}
        >
            <div className={`absolute top-2 left-4 text-base font-Chakra_Petch font-semibold ${isHovered ? 'hovered-text' : ''}`}>
                {title}
            </div>
            <div className={`absolute top-3 right-4 text-xs font-Chakra_Petch font-semibold ${isHovered ? 'hovered-text' : ''}`}>
                {date}
            </div>
            <div className={`relative mt-8 w-full h-48 bg-black transition-transform duration-300 ease-in-out transform ${isHovered ? 'scale-100' : ''}`}>
                {isHovered && (
                    <div className="flex flex-col items-start w-full">
                        <ul className="text-xs space-y-2 mt-8">
                            <li className="text-xs ml-2 cursor-pointer text-white font-Chakra_Petch font-semibold">RULES</li>
                            <li className="text-xs ml-2 cursor-pointer text-white font-Chakra_Petch font-semibold">TEAM MEMBERS</li>
                            <li className="text-xs ml-2 cursor-pointer text-white font-Chakra_Petch font-semibold">COORDINATORS</li>
                        </ul>
                        <div className="flex justify-center w-full mt-4">
                            <button className="bg-black text-white px-4 rounded shadow-lg box-shadow text-xs font-Chakra_Petch font-semibold hovered-text">
                                    REGISTER
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FutureEventCard;
