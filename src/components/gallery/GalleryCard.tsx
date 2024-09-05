import Image from 'next/image';
import React from 'react';

const GalleryCard = () => {
    return (
        <div className='p-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
            <div className='bg-black rounded-md'>
                <div className='py-2 flex flex-col items-center'>
                    <Image src="/home/about/about_logo.png" height={200} width={200} alt='image' className='object-cover' />
                </div>
            </div>
        </div>
    );
}

export default GalleryCard;
