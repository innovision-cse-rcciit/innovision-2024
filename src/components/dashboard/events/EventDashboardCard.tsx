import { formLinks } from "@/utils/constants/formLinks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EventDashboardCard = ({ event }: { event: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      target="_blank"
      href={
        event?.register_through_portal
          ? `/coordinator/${event?.id}`
          : formLinks?.find((eventForm) => eventForm.id === event?.id)?.form ||
            ""
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative border-4 border-[#B61B69] max-w-xs mx-auto rounded-xl overflow-hidden`}
    >
      <Image
        src={event?.banner_url}
        height={200}
        width={400}
        className="rounded-lg"
        alt="event-poster"
      />
      <div
        className={`absolute top-0 w-full h-full bg-[#A31A5F] bg-opacity-50 transform ${
          isHovered
            ? "opacity-100 scale-100 transition-transform duration-1000 ease-out"
            : "opacity-0 scale-110"
        } transition-transform duration-1000 ease-out`}
      >
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-5xl font-sans">
          <button className="text-[#B51C69] px-2 py-2 w-32 rounded-lg text-lg font-Chakra_Petch bg-white">
            Event Details
          </button>
        </span>
      </div>
    </Link>
  );
};

export default EventDashboardCard;
