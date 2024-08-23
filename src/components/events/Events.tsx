import React from 'react'
import FutureEventsHeading from './future/FutureEventsHeading'
import FutureEventCards from './future/FutureEventCards'

const Events = () => {
  return (
    <div className="relative w-full lg:mt-10">
      <div className="mx-auto flex max-w-full flex-col gap-10">
        <FutureEventCards />
        </div>
    </div>
  )
}

export default Events