import Image from 'next/image';
import React from 'react'

const RegButton = ({
    eventDetails,
    onClick,
}:{
    eventDetails: any,
    onClick: any,
}) => {
  return (
    <button
    disabled={!eventDetails.is_open}
    onClick={onClick}
    className="relative flex flex-row mx-auto items-center"
  >
    <Image
      width={100}
      height={40}
      src="https://i.postimg.cc/kXR0L9dy/Button.png"
      className="h-10 w-28 lg:h-14 lg:w-36 lg:text-sm"
      alt="Register Now"
    />
    <h1 className="absolute mx-3 lg:mx-5 font-Chakra_Petch text-[#B61B69] text-xs lg:text-sm font-bold">
      REGISTER NOW
    </h1>
  </button>
  )
}

export default RegButton
