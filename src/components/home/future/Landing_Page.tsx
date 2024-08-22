import React from 'react';
import Image from 'next/image';

const LandingPage = () => {
    const date = new Date();
    const day = date.toLocaleString('en-GB', { day: 'numeric' });
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear() + 1000;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return (
        <div className="h-screen w-screen relative">
            <img
                src='/landing/Future_landing_page.png'
                className='w-full h-full object-cover'
                alt='Landing'
            />
            <img
                className='absolute top-2 left-2 h-10 w-52 sm:h-12 sm:w-64 md:h-16 md:w-72 lg:h-15 lg:w-70 xl:top-8 xl:left-16'
                src='landing/innovision-heading.png'
                alt='Heading'
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-5/6 border-4 rounded-3xl border-white md:w-10/12 md:h-4/5 lg:w-11/12 lg:h-3/4 xl:w-11/12 xl:h-3/4" />
            <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center lg:flex-row lg:gap-x-60 xl:gap-x-96'>
                <img
                    className='opacity-70 h-40 w-44 sm:h-44 sm:w-44 lg:h-60 lg:w-64 top-40 left-20 sm:top-48 sm:left-32 md:top-52 md:left-36 lg:top-56 lg:left-40'
                    src='landing/Innovision-logo-landing.png'
                    alt='Logo'
                />
                <div className='flex flex-col gap-4 items-center lg:items-end'>
                    <div className='text-sm text-white top-64 right-10 md:top-80 md:right-24 lg:top-88 lg:right-32 lg:text-base xl:text-xl'>
                        PRESENTED BY CSE DEPARTMENT OF RCCIIT
                    </div>
                    <button className='bg-[#DAD7D9] text-[#B61B69] font-bold h-10 w-28 text-xs lg:h-14 lg:w-36 lg:text-sm'>
                        REGISTER NOW
                    </button>
                    <div className='text-white text-sm'>
                        {`${day} ${month}, ${year} ${hours}:${minutes}`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
