import React from "react";
import EventCard from "./EventCard";

const ProfilePage = () => {
  const participant = {
    name: "Sutanuka Chakraborty",
    collegeRoll: "CSE2023062",
    phoneNumber: "000000000",
    department: "CSE",
    section: "A",
    registeredEvents: [
      {
        id: 1,
        name: "Webify",
        teamName: "abc",
        teamLead: "abc",
      },
      {
        id: 2,
        name: "Modelify",
        teamName: "abc",
        teamLead: "abc",
      },
      {
        id: 3,
        name: "Codathon",
        teamName: "abc",
        teamLead: "abc",
      },
      {
        id: 4,
        name: "Hackathon",
        teamName: "abc",
        teamLead: "abc",
      },
      {
        id: 5,
        name: "Tech C",
        teamName: "abc",
        teamLead: "abc",
      },
      {
        id: 6,
        name: "Extempore",
        teamName: "abc",
        teamLead: "abc",
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8"
      style={{
        backgroundImage: "url('/registered_events.png')",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold">Name: <span className="text-pink-400">{participant.name}</span></h2>
            <p className="text-lg">College Roll: <span className="text-pink-400">{participant.collegeRoll}</span></p>
            <p className="text-lg">Phone Number: <span className="text-pink-400">{participant.phoneNumber}</span></p>
          </div>
          <div>
            <p className="text-lg">Department: <span className="text-pink-400">{participant.department}</span></p>
            <p className="text-lg">Section: <span className="text-pink-400">{participant.section}</span></p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-center">Registered Events:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {participant.registeredEvents.map((event) => (
            <EventCard
              key={event.id}
              eventName={event.name}
              teamName={event.teamName}
              teamLead={event.teamLead}
              imageUrl="/path/to/image.jpg" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

