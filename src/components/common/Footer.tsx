import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <div className="w-full relative bg-gradient-to-r bg-black py-10 flex flex-col items-center">
      <div className="relative z-10 w-full mx-auto text-center mb-6 p-4">
        <Image height={500} width={500} src="/home/image.png" alt="Innovision" className="mx-auto object-cover" />
      </div>

      <div className="absolute top-0 z-0 mx-auto p-2">
        <Image height={250} width={250} src="/innovision.svg" alt="Innovision bg" className="mx-auto object-cover"/>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center space-x-4 sm:space-x-8 mt-6">
        <Link href="/events" className="text-white text-sm sm:text-lg font-Chakra_Petch">EVENTS</Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link href="/gallery" className="text-white text-sm sm:text-lg font-Chakra_Petch">GALLERY</Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link href="/team/leads" className="text-white text-sm sm:text-lg font-Chakra_Petch">TEAM</Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link href="/profile" className="text-white text-sm sm:text-lg font-Chakra_Petch">MY PROFILE</Link>
      </div>

      <div className="flex justify-center space-x-4 sm:space-x-6 mt-6">
        <Link href="https://www.instagram.com/innovisionrcc/"><img src="/home/socials/instagram.svg" alt="Instagram" className="h-6 w-6 sm:h-8 sm:w-8"/></Link>
        <Link href="https://www.facebook.com/innovisionrcc"><img src="/home/socials/facebook.svg" alt="Facebook" className="h-6 w-6 sm:h-8 sm:w-8"/></Link>
        <Link href="https://discord.gg/EHYzPJeYAK"><img src="/home/socials/discord.svg" alt="Discord" className="h-6 w-6 sm:h-8 sm:w-8"/></Link>
      </div>

      <div className="text-white text-xs sm:text-sm text-center mt-8 font-Chakra_Petch">
        DEPARTMENT OF CSE, RCCIIT
      </div>
    </div>
  );
};

export default Footer;
