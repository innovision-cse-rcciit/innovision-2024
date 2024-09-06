
import React from 'react'
import EventDetailsCard from '@/components/events/EventDetailsCard';

type Params = {
    params: {
        event: string
    }
}

const Page = ({params: {event}}: Params) => {
    return (
        <div className='flex flex-col items-center gap-10 relative w-full min-h-screen py-20 px-10 bg-no-repeat bg-center' style={{
            background: 'url("/events/Background-img.png")',
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
        }}>
            <div className='w-full md:w-[80%] lg:w-[70%]'>
                <EventDetailsCard eventId={event} />
            </div>
        </div>
    )
}

export default Page;
