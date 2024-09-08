import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="w-full relative bg-gradient-to-r bg-black py-10 flex flex-col items-center">
      <div className="relative z-10 w-full mx-auto text-center mb-6 p-4">
        <Image
          height={400}
          width={400}
          src="https://i.postimg.cc/W4p806NH/image1.png"
          alt="Innovision"
          className="mx-auto object-cover pt-10"
        />
      </div>

      <div className="absolute top-0 z-0 mx-auto p-2">
        <Image
          height={250}
          width={250}
          src="https://i.postimg.cc/G297YJLj/about_logo.png"
          alt="Innovision bg"
          className="mx-auto object-cover opacity-25"
        />
      </div>

      <div className="relative z-10 flex flex-wrap justify-center space-x-4 sm:space-x-8 mt-6">
        <Link
          href="/events"
          className="text-white text-sm sm:text-lg font-Chakra_Petch"
        >
          EVENTS
        </Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link
          href="/gallery"
          className="text-white text-sm sm:text-lg font-Chakra_Petch"
        >
          GALLERY
        </Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link
          href="/team/leads"
          className="text-white text-sm sm:text-lg font-Chakra_Petch"
        >
          TEAM
        </Link>
        <span className="hidden sm:inline text-white">|</span>
        <Link
          href="/profile"
          className="text-white text-sm sm:text-lg font-Chakra_Petch"
        >
          MY PROFILE
        </Link>
      </div>

      <div className="flex justify-center space-x-4 sm:space-x-6 mt-6">
        <Link target="_blank" href="https://www.instagram.com/innovisionrcc/">
        <FaInstagram size={30} color="pink" />
        </Link>
        <Link target="_blank" href="https://www.facebook.com/innovisionrcc">
        <FaFacebook size={30} color="skyblue" />
        </Link>
        <Link target="_blank" href="https://discord.gg/EHYzPJeYAK">
        <FaDiscord size={30} color="violet" />
        </Link>
      </div>

      <div className="text-white text-xs sm:text-sm text-center mt-8 font-Chakra_Petch">
        DEPARTMENT OF CSE, RCCIIT
      </div>
    </div>
  );
};

export default Footer;
