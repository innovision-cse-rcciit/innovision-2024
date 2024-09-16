import { supabase } from "@/lib/supabase-client";
import { clickSound } from "@/utils/functions/clickSound";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const EventRegCard = ({ teams }: { teams: any }) => {
    const [verified, setVerified] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
    const [eventImage, setEventImage] = useState<string>("");
    const [event, setEvent] = useState<any>("");
    const [members, setMembers] = useState<any>([]);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  
    useEffect(() => {
      const getEventName = async () => {
        const { data, error } = await supabase
          .from("events")
          .select("event_name,banner_url")
          .eq("id", teams.event_id);
        setEvent(data![0].event_name);
        setEventImage(data![0].banner_url);
        setMembers(teams.participants);
      };
      getEventName();
    }, [teams]);
  
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  
    const generateQrCode = async () => {
      const qrData = `event_id: ${teams.event_id}, team_id: ${teams.team_id}`;
      try {
        const url = await QRCode.toDataURL(qrData);
        setQrCodeUrl(url);
        setIsQrOpen(true);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
  
    return (
      <>
       <div className="px-5 lg:px-0  md:w-[70%] lg:w-[40%] border-2 border-white rounded-xl backdrop-blur-md xl:w-[25%] 2xl:h-auto">
        <div className="flex py-5 flex-col items-center justify-around gap-2 lg:gap-5 rounded-xl bg-body  font-Chakra_Petch  text-sm font-semibold tracking-widest  ">
          {eventImage! && (
            <Image src={eventImage!} width={250} height={100} alt="" />
          )}
  
          <div className="flex flex-row text-base md:text-xl xl:text-lg flex-wrap items-center gap-2">
            <h1>Event :</h1> <span>{event!}</span>
          </div>
  
          <div className="flex flex-row flex-wrap items-center text-base md:text-xl xl:text-lg justify-center gap-2">
            <h1>{members! && members?.length > 1 ? "Team Name" : "Name"} :</h1>{" "}
            <span>{teams.team_name}</span>
          </div>
          <div className="flex flex-row flex-wrap items-center text-base md:text-xl xl:text-lg justify-center gap-2">
            <h1>
              {members! && members?.length > 1 ? "Team Lead Email" : "Email"}:
            </h1>{" "}
            <span>{teams.team_lead_email}</span>
          </div>
          {members! && members?.length > 1 && (
            <button
              onClick={() => {
                clickSound();
                setIsOpen(true);
              }}
              className="rounded-xl border hover:cursor-pointer border-[#B51C69] bg-[#B51C69] px-3 py-1 text-white hover:bg-black hover:text-regalia hover:border-[#B51C69] "
            >
              View Members
            </button>
          )}
          <button
            onClick={generateQrCode}
            className="rounded-xl border hover:cursor-pointer border-[#B51C69] bg-[#B51C69] px-3 py-1 mt-2 text-white hover:bg-black hover:text-regalia hover:border-[#B51C69] "
          >
            Show QR
          </button>
        </div>
  
       
        
      </div>
      <MemberModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          members={teams.participants}
        />
      <QrCodeModal isQrOpen={isQrOpen} onClose={() => setIsQrOpen(false)} qrCodeUrl={qrCodeUrl} />
      </>
     
    );
  };
  
  const MemberModal = ({
    isOpen,
    onClose,
    members,
  }: {
    isOpen: boolean;
    onClose: () => void;
    members: any;
  }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed  inset-0 flex items-center  tracking-widest justify-center bg-black bg-opacity-50 z-[50]">
            <div
              className={`flex h-auto max-h-[50vh] md:max-h-[40vh] lg:max-h-[50vh] 2xl:max-h-[60vh] w-[90%] flex-col
               items-start rounded-lg bg-body border-y-2 border-[#B51C69] p-4 md:w-[35%] lg:w-[100%] `}
              style={{ background: 'url("/events/Background-img.png")' }}
            >
              <div className="mb-2 flex w-full flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">Members</h2>
  
                <h2
                  onClick={onClose}
                  className="cursor-pointer rounded-xl border border-[#B51C69] bg-regalia px-3 py-1 text-white hover:bg-black bg-[#B51C69] hover:text-[#B51C69] hover:border-[#B51C69]"
                >
                  X
                </h2>
              </div>
  
              <div className="my-1 flex  w-full flex-col items-center gap-2 overflow-y-auto px-1 py-2 text-center">
                {members.map((member: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex w-full flex-col flex-wrap justify-around bg-body text-center font-semibold md:flex-row"
                    >
                      <h1>{member.name}</h1>
                      <a
                        className="text-red-500 hover:cursor-pointer hover:opacity-70"
                        href={`tel:${member.phone}`}
                      >
                        {member.phone}
                      </a>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-3 rounded-xl border border-[#B51C69] bg-[#B51C69] px-3 py-1 text-white hover:bg-black hover:text-[#B51C69] hover:border-[#B51C69]"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  
  const QrCodeModal = ({
    isQrOpen,
    onClose,
    qrCodeUrl,
  }: {
    isQrOpen: boolean;
    onClose: () => void;
    qrCodeUrl: string;
  }) => {
    return (
      <>
        {isQrOpen && (
          <div className="fixed inset-0 flex items-center tracking-widest justify-center bg-black bg-opacity-10 z-[50]">
            <div className="flex flex-col w-[70%] md:w-[40%] lg:w-[25%] items-center justify-center bg-black p-5 rounded-lg border-2 border-[#B51C69]">
              <h2 className="text-base text-center font-semibold text-white mb-4">Scan this QR Code by Event Coordinator to get Attendance</h2>
              <Image height={100} width={100} src={qrCodeUrl} alt="QR Code" className="w-40 h-40" />
              <button
                onClick={onClose}
                className="mt-4 rounded-xl border border-[#B51C69] bg-[#B51C69] px-3 py-1 text-white hover:bg-black hover:text-[#B51C69] hover:border-[#B51C69]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

export default EventRegCard
