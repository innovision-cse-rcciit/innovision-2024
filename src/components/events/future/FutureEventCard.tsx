import React from 'react';
import './FutureEventCard.css';
import './EventHoverEffect.css';

const FutureEventCard = ({ date, title }: {
    date: string;
    title: string;
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <div
            id='cardContainer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative border-4 border-[#B61B69] max-w-xs mx-auto rounded-xl`}
        >
            <img src='/events/Webify_poster.jpeg' className='rounded-lg' />
            <div id='overlay'>
                <span>
                    <button className='text-[#B51C69] px-2 py-2 w-32 rounded-lg text-lg font-Chakra_Petch bg-white'>
                        Register
                    </button>
                </span>
            </div>
        </div>
    );
};

export default FutureEventCard;
