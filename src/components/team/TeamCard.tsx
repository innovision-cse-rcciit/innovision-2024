import React from 'react';

const TeamCard = ({Name,Role}:
    {Name: string, Role: string}
) => {
  return (
      <div className="bg-[linear-gradient(126.67deg, #DAD7D9 0.76%, rgba(218, 215, 217, 0.28) 100%)] h-96 rounded-md flex flex-col items-center shadow-lg text-white">
        <img
          src="./Bagh.jpg"
          alt="Person"
          className="h-40 w-40 rounded-full border-4 border-gray-700 mt-5 shadow-lg"
        />
        <p className="mt-4 text-lg font-Chakra_Petch font-medium">{Name}</p>
        <p className="mt-4 text-lg font-Chakra_Petch font-medium">{Role}</p>
        <ul className="flex space-x-2 mt-4">
          <li><a href="#" className="text-white"><i className="fa fa-instagram"></i></a></li>
          <li><a href="#" className="text-white"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#" className="text-white"><i className="fa fa-linkedin"></i></a></li>
          <li><a href="#" className="text-white"><i className="fa fa-codepen"></i></a></li>
        </ul>
      </div>
     
  );
};

export default TeamCard;
