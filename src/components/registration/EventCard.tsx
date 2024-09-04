import React from "react";

type EventCardProps = {
  eventName: string;
  teamName: string;
  teamLead: string;
  imageUrl: string; 
};

const EventCard: React.FC<EventCardProps> = ({
  eventName,
  teamName,
  teamLead,
  imageUrl,
}) => {
  return (
    <div
      className="relative w-80 h-56 rounded-lg p-4 flex flex-col justify-between items-center border-2 border-pink-500"
      style={{ background: "rgba(255, 255, 255, 0.4)" }}
    >
      <div className="w-full h-24 bg-gray-300 rounded-lg mb-2 overflow-hidden">
        <img
          src={imageUrl}
          alt="Event"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <h4
        className="text-xl font-extrabold text-white relative"
        style={{
          textShadow: '1px 1px 0 #FF1493, -1px -1px 0 #FF1493, 1px -1px 0 #FF1493, -1px 1px 0 #FF1493', 
        }}
      >
        {eventName}
      </h4>
      <div className="text-left w-full px-2">
        <p className="text-sm text-gray-900">Team Name: {teamName}</p> 
        <p className="text-sm text-gray-900">Team Lead: {teamLead}</p>
      </div>
      <div className="flex justify-between w-full px-2">
        <button className="bg-gray-800 hover:bg-gray-600 text-white text-xs py-1 px-3 rounded shadow-lg">
          View team members
        </button>
        <button className="bg-pink-500 hover:bg-pink-700 text-white text-xs py-1 px-3 rounded shadow-lg">
          VIEW QR
        </button>
      </div>
    </div>
  );
};

export default EventCard;
