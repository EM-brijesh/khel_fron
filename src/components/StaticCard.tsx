import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";


interface CardProps {
  title: string;
  desc: string;
  date: string;
  location: string;
  isFull: boolean;
  participants: string[];
  vacant: number; // Total spots available for the event
}

const Card: React.FC<CardProps> = ({
  title,
  desc,
  date,
  location,
 
  participants,
  vacant,
}) => {
  const availableSpots = vacant - participants.length;

  return (
    <div className="flex flex-col bg-indigo-100 shadow-lg rounded-xl p-6 w-80">
      <h2 className="text-lg font-semibold text-black-800">{title}</h2>
      <p className="text-sm text-black-600 mt-1">{desc}</p>
      <div className="flex items-center text-black-600 mt-3">
        <Calendar className="w-5 h-5 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-black-600 mt-2">
        <MapPin className="w-5 h-5 mr-2" />
        <span>{location}</span>
      </div>
      <div className="flex items-center text-black-600 mt-2">
        <Users className="w-5 h-5 mr-2" />
        <span>
          <strong>{availableSpots}</strong> spots available out of{" "}
          <strong>{vacant}</strong>
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-black-700 text-sm font-medium">Participants:</h3>
        <ul className="text-sm text-black-600 list-disc list-inside mt-2">
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))
          ) : (
            <li>No participants yet</li>
          )}
        </ul>
      </div>
      {/* <button
      className="mt-6 px-4 py-2 w-full rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
      onClick={() => navigate("/Dashboard")} // Replace "/target-page" with your desired route
    >
      Join Event
    </button> */}
    <div
      className="mt-6 px-4 py-2 w-full rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"

    >
      Join Event
    </div>
    </div>
  );
};

export default Card;