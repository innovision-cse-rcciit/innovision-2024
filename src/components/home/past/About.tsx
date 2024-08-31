import React from 'react'

const About = () => {
  return (

    <div className=" relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/about_background.png')" }}>

            <div className="relative top-0 left-0 z-10">
            
      </div>
      <div className=" flex flex-col md:flex-row items-center text-white p-6 md:p-16 ">       
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <img src="/home/about/about_logo.png" alt="Main Logo" className="w-80 h-80 md:w-[500px] md:h-[500px]" />
          <img src="\home\about\innovision_logo.png" alt="Innovision Logo" className="w-72 h-20 md:w-96 md:h-32  mt-[-10px]" />
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-left md:pl-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">ABOUT US</h2>
          <p className="leading-relaxed text-sm md:text-base">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
