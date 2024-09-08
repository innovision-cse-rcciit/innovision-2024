import React from 'react';
import Image from 'next/image';
import { useCurrentDateTime } from '@/utils/functions/dateTime';
import Link from 'next/link';

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
        <div
            className="relative w-full h-screen max-md:w-screen max-md:h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/Landing/Future_landing_page.png')" }}
        >
            <div className="flex items-center justify-center my-auto mx-auto h-full">
                <div className='rounded-xl backdrop-blur-sm flex flex-row md:pt-10 hover:backdrop-blur-none cursor-pointer flex-wrap border-2 border-white  w-4/5 h-4/5 transform -translate-y-1/6 gap-4 items-center justify-around  '>
                    <div className='absolute left-10 top-10 max-md:hidden'>
                        <Image
                            height={40}
                            width={40}
                            src='/Landing/arrow.png'
                            alt='Logo'
                        />
                    </div>
                    <Image
                        height={400}
                        width={440}
                        src='https://i.postimg.cc/JnPs7b2s/Innovision-logo-landing.png'
                        className=' max-md:w-48 max-md:h-42 md:w-56 md:h-48 xl:w-80 xl:h-72'
                        alt='Logo'
                    />
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='bg-white px-10 py-2 border rounded-xl'>
                            <h1 className='keania-one-regular text-2xl md:text-4xl lg:text-6xl text-[#B61B69]'>INNOVISION 2024</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center lg:items-end px-5'>
                            <h1 className='text-white font-semibold text-md md:text-xl text-center'>THE ANNUAL DEPARTMENTAL FEST OF CSE DEPARTMENT</h1>
                            <Link href={"/events"}>
                                <button className='flex flex-row bg-transparent items-center hover:opacity-90 relative'>
                                    <Image
                                        width={112}
                                        height={110}
                                        alt='Register'
                                        src='/Landing/Button.png'
                                        className='w-32 h-15 md:w-44'
                                    />
                                    <h1 className='absolute text-center w-full font-Chakra_Petch text-[#B61B69] text-sm md:text-lg font-bold'>
                                        REGISTER NOW
                                    </h1>
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <Link href={'https://www.nbaind.org/'} className='flex items-center lg:items-end px-5'>
                                <button className='flex flex-row bg-transparent items-center hover:opacity-90 relative'>
                                    <Image
                                        width={112}
                                        height={110}
                                        alt='Register'
                                        src='/nba.png'
                                        className='w-20 h-16 md:h-20 md:w-30'
                                    />
                                </button>
                            </Link>
                            <Link href={'https://rcciit.org/'} className='flex items-center lg:items-end px-5'>
                                <button className='flex flex-row bg-transparent items-center hover:opacity-90 relative'>
                                    <Image
                                        width={112}
                                        height={110}
                                        alt='Register'
                                        src='/rcciit.png'
                                        className='w-40 md:w-40'
                                    />
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='flex flex-row items-center justify-center'>
                                {timeDigits.map((digit, index) => (
                                    <div key={index} className='relative flex items-center justify-center'>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={digit === ':' ? "/Landing/Time-asset-colon.svg" : `/Landing/Time-asset-1.svg`}
                                            className={digit === ':' ? 'h-6 mt-2 xl:h-8 xl:mt-2 ' : `h-10 md:h-12 xl:h-16 ${index % 2 === 0 ? '' : 'transform rotate-180'}`}
                                            alt={`time-${digit}`}
                                        />
                                        <h1 className={`${digit === ':' ? 'text-white' : 'text-[#B51C69]'} absolute text-[#B51C69] text-xl md:text-2xl keania-one-regular`}>
                                            {(digit === ":") ? "" : digit}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                            <div className='text-[#DAD7D9] text-2xl lg:text-3xl keania-one-regular'>
                                {`${day} ${month}, ${year}`}
                            </div>
                        </div>
                    </div>
                    <div className='max-md:pb-10 px-5'>
                        <Image
                            height={100}
                            width={1240}
                            src='/Landing/lines.png'
                            alt='Logo'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
