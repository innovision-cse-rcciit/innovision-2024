import Image from 'next/image'
import React from 'react'

const TeamCard = ({ name, role }: { name: string, role: string }) => {
    return (
        <div className='p-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
            <div className='bg-black rounded-md'>
                <div className='py-2 flex flex-col items-center'>
                    <div className='rounded-full overflow-hidden w-48 h-48'>
                        <Image src="/home/about/about_logo.png" height={200} width={200} alt='image' className='object-cover' />
                    </div>
                    <div className='text-white keania-one-regular'>
                        Dibakar Banerjee
                    </div>
                    <div className='text-white font-Chakra_Petch'>
                        Tech Team
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamCard;