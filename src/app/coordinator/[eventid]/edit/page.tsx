import React from 'react'
import AddEventForm from '@/components/dashboard/events/AddEventForm'

type Props = {}

const AddEventPage = (props: Props) => {
    return (
        <div className="flex flex-col justify-center items-center gap-y-8 m-10">
            <h1 className='text-lg'>Add Event</h1>
            <div className="border border-black p-4 rounded-lg w-auto">
                <AddEventForm  />
            </div>
        </div>
    )
}

export default AddEventPage