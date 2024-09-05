import Image from 'next/image'
import React from 'react'

const TeamCard = ({ name, role,imageUrl }: { name: string, role: string,imageUrl:string }) => {
    return (
        <div className='p-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
            <div className='bg-black rounded-md'>
                <div className='py-2 flex flex-col items-center'>
                    <div className='rounded-full overflow-hidden w-48 h-48'>
                        <Image src={imageUrl} height={200} width={200} alt='image' className='object-cover' />
                    </div>
                    <div className='text-white keania-one-regular'>
                        {name}
                    </div>
                    <div className='text-white font-Chakra_Petch'>
                        {role}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamCard;