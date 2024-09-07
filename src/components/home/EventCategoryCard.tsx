import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EventCategoryCard = ({ event }: { event: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/events`} className="card">
      <div
        className="card-info relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={event.image}
          className={`object-cover w-full h-full transition-all duration-1000 ${
            isHovered ? "brightness-50" : "brightness-100"
          }`}
          alt={event.title}
          width={300}
          height={300}
        />
        <div
          className={`absolute top-0 w-full h-full transform ${
            isHovered
              ? "opacity-100 scale-100 transition-transform duration-1000 ease-out"
              : "opacity-0 scale-110"
          } transition-transform duration-1000 ease-out`}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className={`text-white px-2 py-2 w-48 rounded-lg text-xl font-bold font-Chakra_Petch transform ${
                isHovered
                  ? "opacity-100 scale-100 transition-transform duration-1000 ease-out"
                  : "opacity-0 scale-110"
              } transition-transform duration-1000 ease-out text-center`}
            >
              {event.title}
            </div>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCategoryCard;
