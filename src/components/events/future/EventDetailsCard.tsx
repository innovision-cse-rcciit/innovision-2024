import React from 'react';
import "./EventGlowFont.css";

const EventDetailsCard = () => {
    return (
        <div className="bg-transparent border-4 rounded-3xl border-white">
            <div className="flex flex-col md:flex-row-reverse gap-3 md:gap-5 py-5 px-7 lg:p-10">
                <div className='flex flex-col gap-2 md:gap-3 items-center'>
                    <div className='h-40 w-36 md:h-60 md:w-48 xl:h-80 xl:w-80 bg-gray-400'></div>
                    <div className='relative flex flex-row items-center'>
                        <img
                            src='/landing/Button.png'
                            className='h-10 w-28 lg:h-14 lg:w-36 lg:text-sm'
                            alt='Register Now'
                        />
                        <h1 className='absolute mx-3 lg:mx-5 font-Chakra_Petch text-[#B61B69] text-xs lg:text-sm font-bold'>
                            REGISTER NOW
                        </h1>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:gap-5 items-start'>
                    <div className="flex flex-row gap-1">
                        <h1 id='glow' className='text-2xl font-Chakra_Petch italic'>
                            WEBIFY
                        </h1>
                    </div>
                    <h1 className='text-white text-md font-Chakra_Petch w-full md:w-4/5 lg:w-3/5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio modi illum cum itaque ex iusto porro optio ipsum. Id doloremque autem aperiam illo. Officiis, magnam ea. Natus fugit blanditiis neque!
                    </h1>
                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-12">
                        <div className="flex flex-col gap-4 lg:gap-5 w-full md:w-3/4 lg:w-64">
                            <div className="flex flex-row gap-1">
                                <h1 id='glow' className='text-xl font-Chakra_Petch italic'>
                                    TEAM SIZE:
                                </h1>
                                <h1 className='text-white text-xl font-Chakra_Petch'>
                                    4-5
                                </h1>
                            </div>
                            <div className="flex flex-row gap-1">
                                <h1 id='glow' className='text-xl font-Chakra_Petch italic'>
                                    VENUE:
                                </h1>
                                <h1 className='text-white text-xl font-Chakra_Petch'>
                                    N314
                                </h1>
                            </div>
                            <div className="flex flex-row gap-1">
                                <h1 id='glow' className='text-xl font-Chakra_Petch italic'>
                                    EVENT MODE:
                                </h1>
                                <h1 className='text-white text-xl font-Chakra_Petch'>
                                    Offline
                                </h1>
                            </div>
                            <button className='text-white px-2 py-2 w-40 md:w-48 lg:w-64 rounded-lg text-xs lg:text-md font-Chakra_Petch italic bg-[#B51C69] shadow-[4.0px_8.0px_8.0px_gray]'>
                                View Rules and Regulations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetailsCard;
