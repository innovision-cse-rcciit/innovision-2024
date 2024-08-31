import React from 'react';
import {useCurrentDateTime} from "../../../utils/functions/dateTime"

const LandingPage = () => {
    const { day, month, year, hours, minutes } = useCurrentDateTime();
    const timeDigits = [
        hours[0],
        hours[1],
        ':',
        minutes[0],
        minutes[1]
    ];

    return (
        <div className="max-md:h-screen max-md:w-screen relative">
            <img
                src='/landing/Future_landing_page.png'
                className='w-full h-full object-cover'
                alt='Landing'
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 border-4 rounded-3xl border-white md:w-10/12 md:h-4/5 lg:w-11/12 lg:h-3/4 xl:w-11/12 xl:h-3/4" />
            <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center lg:flex-row lg:gap-x-60 xl:gap-x-96'>
                <img
                    className='opacity-70 h-40 w-44 sm:h-44 sm:w-44 lg:h-60 lg:w-64 top-40 left-20 sm:top-48 sm:left-32 md:top-52 md:left-36 lg:top-56 lg:left-40'
                    src='landing/Innovision-logo-landing.png'
                    alt='Logo'
                />
                <div className='flex flex-col gap-14 items-center'>
                    <div className='flex flex-col gap-2 items-center lg:items-end'>
                        <div className='text-sm text-[#DAD7D9] top-64 right-10 md:top-80 md:right-24 lg:top-88 lg:right-32 lg:text-base xl:text-xl font-Chakra_Petch italic'>
                            PRESENTED BY CSE DEPARTMENT OF RCCIIT
                        </div>
                        <div className='flex flex-row items-center'>
                            <img 
                                src='/landing/Button.png'
                                className='h-10 w-28 lg:h-14 lg:w-36 lg:text-sm'
                            />
                            <h1 className='absolute mx-3 lg:mx-5 font-Chakra_Petch text-[#B61B69] text-xs lg:text-sm font-bold'>
                                REGISTER NOW
                            </h1>
                        </div>
                        {/* <button className='bg-[#DAD7D9] text-[#B61B69] font-bold h-10 w-28 text-xs lg:h-14 lg:w-36 lg:text-sm'>
                            REGISTER NOW
                        </button> */}
                    </div>
                    <div className='flex flex-col gap-5 items-center'>
                        <div className='flex flex-row items-center'>
                            {timeDigits.map((digit, index) => (
                                <div key={index} className='relative flex items-center justify-center'>
                                    <img
                                        src={digit === ':' ? "landing/Time-asset-colon.svg" : `landing/Time-asset-1.svg`}
                                        className={digit === ':' ? 'h-6 mt-2 ml-2 mr-2 xl:h-10 xl:mt-4 xl:ml-4 xl:mr-4' : `h-14 xl:h-20 ${index % 2 === 0 ? '' : 'transform rotate-180'}`}
                                        alt={`time-${digit}`}
                                    />
                                    <h1 className='absolute text-[#B51C69] text-3xl keania-one-regular'>
                                        {(digit === ":") ? "" : digit}
                                    </h1>
                                </div>
                            ))}
                        </div>
                        <div className='text-[#DAD7D9] text-4xl keania-one-regular'>
                            {`${day} ${month}, ${year}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
