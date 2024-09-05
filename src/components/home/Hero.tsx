import React from 'react';
import Image from 'next/image';
import { useCurrentDateTime } from '@/utils/functions/dateTime';

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
            className="relative w-full h-screen max-md:w-screen max-md:h-screen bg-cover bg-center">
            <Image 
                src={'https://i.postimg.cc/Pqdw4FWp/Future-landing-page.png'} 
                alt='' 
                layout="fill" 
                objectFit="cover" 
                quality={100} 
                priority={true}
                className="absolute top-0 left-0 z-0"
            />
            <div className="flex items-center justify-center my-auto mx-auto h-full relative z-10">
                <div className='rounded-xl backdrop-blur-sm flex flex-row md:pt-10 hover:backdrop-blur-none cursor-pointer flex-wrap border-2 border-white  w-4/5 h-4/5 transform -translate-y-1/6 gap-4 items-center justify-around'>
                    <div className='absolute left-10 top-10'>
                        <Image 
                            height={40} 
                            width={40}
                            src='/landing/arrow.png'
                            alt='Logo'
                        />
                    </div>
                    <Image 
                        height={400} 
                        width={440}
                        src='/Landing/innovision-logo-landing.png'
                        className=' max-md:w-72 max-md:h-60 md:w-56 md:h-48 xl:w-96 xl:h-80'
                        alt='Logo'
                    />
                    <div className='flex flex-col gap-5 items-center'>
                        <div className='bg-white px-10 py-2 border rounded-xl'>
                            <h1 className='keania-one-regular text-3xl md:text-4xl lg:text-7xl text-[#B61B69]'>INNOVISION 2024</h1>
                        </div>
                        <div className='flex flex-col gap-2 items-center lg:items-end px-5'>
                            <h1 className='text-white font-semibold text-lg md:text-2xl text-center'>THE ANNUAL DEPARTMENTAL FEST OF CSE DEPARTMENT</h1>
                            <button className='flex flex-row bg-transparent items-center hover:opacity-90 relative'>
                                <Image 
                                    width={112}
                                    height={110}
                                    alt='Register' 
                                    src='/landing/Button.png'
                                    className='w-40 md:w-60'
                                />
                                <h1 className='absolute text-center w-full font-Chakra_Petch text-[#B61B69] text-sm md:text-xl font-bold'>
                                    REGISTER NOW
                                </h1>
                            </button>
                        </div>
                        <div className='flex flex-col gap-5 items-center'>
                            <div className='flex flex-row items-center justify-center'>
                                {timeDigits.map((digit, index) => (
                                    <div key={index} className='relative flex items-center justify-center'>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={digit === ':' ? "landing/Time-asset-colon.svg" : `landing/Time-asset-1.svg`}
                                            className={digit === ':' ? 'h-6 mt-2  xl:h-10 xl:mt-4 ' : `h-10 md:h-14 xl:h-20 ${index % 2 === 0 ? '' : 'transform rotate-180'}`}
                                            alt={`time-${digit}`}
                                        />
                                        <h1 className={`${digit === ':' ? 'text-white' : 'text-[#B51C69]'} absolute text-[#B51C69] text-xl md:text-3xl keania-one-regular`}>
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
                    <div className='max-md:pb-10 px-5'>
                        <Image 
                            height={400}
                            width={1240}
                            src='/landing/lines.png'
                            alt='Logo'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
