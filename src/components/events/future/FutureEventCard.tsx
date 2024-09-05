import React from 'react';

const FutureEventCard = ({ imageUrl }: {imageUrl: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative border-4 border-[#B61B69] max-w-xs mx-auto rounded-xl overflow-hidden`}
        >
            <img src={imageUrl} className='rounded-lg' />
            <div
                className={`absolute top-0 w-full h-full bg-[#A31A5F] bg-opacity-50 transform ${isHovered ? 'opacity-100 scale-100 transition-transform duration-1000 ease-out' : 'opacity-0 scale-110'} transition-transform duration-1000 ease-out`}
            >
                <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl font-sans'>
                    <button className='text-[#B51C69] px-2 py-2 w-32 rounded-lg text-lg font-Chakra_Petch bg-white'>
                        Register
                    </button>
                </span>
            </div>
        </div>
    );
};

export default FutureEventCard;
