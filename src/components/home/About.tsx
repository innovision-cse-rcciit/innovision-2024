import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div
      className=" relative min-h-1/2 font-Chakra_Petch flex items-center justify-center bg-cover bg-center"
      // style={{ backgroundImage: "url('/home/events-bg.png')" }}
    >
      <div className="relative top-0 left-0 z-10"></div>
      <div className=" flex flex-col md:flex-row-reverse items-center text-white p-6 md:p-16 ">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <Image
            width={400}
            height={400}
            src="/home/about/about_logo.png"
            alt="Main Logo"
          />
          
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-left md:pl-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">ABOUT US</h2>
          <p className="leading-relaxed text-sm md:text-base">
            INNOVISION 2024, the highly anticipated fest by the CSE Department
            of RCCIIT, celebrates creativity, technology, and innovation. It
            offers a dynamic platform for students to showcase their skills
            through diverse events. From tech challenges, hackathons, and
            robotics competitions to non-tech activities like design contests
            and debates, there's something for everyone. Gaming enthusiasts can
            also enjoy thrilling e-sports tournaments. INNOVISION 2024 is not
            just about competition but also about collaboration, learning, and
            embracing the spirit of innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
