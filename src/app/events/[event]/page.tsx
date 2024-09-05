'use client';
import React from 'react'
import EventDetailsCard from '@/components/events/future/EventDetailsCard';
import { useParams } from 'next/navigation';

const EventDetails = () => {
    const {event} = useParams();
    console.log(event);
    return (
        <div className='flex flex-col items-center relative'>
            <img
                src="/events/Background-img.png"
                className='w-screen h-screen object-cover'
                alt='background'
            />
            <div className='absolute top-5 h-1/2 md:h-1/3 lg:h-1/2 w-11/12 md:w-4/5 lg:w-3/4'>
                <EventDetailsCard />
            </div>
        </div>
    )
}

export default EventDetails
