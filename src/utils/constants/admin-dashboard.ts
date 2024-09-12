import { Role } from "@/lib/schema/add-coordinator-volunteer-schema";
import { EventMode } from "@/lib/schema/add-event-schema";

export enum AdminTabs {
    COORDINATOR = "COORDINATORS",
    PARTICIPANTS = "PARTICIPANTS",
    EVENTS = "EVENTS"
}

export type Coordinator = {
    id: string;
    name: string;
    email: string;
    event: string;
    type: Role;
}

// export type Participant = {
//     id: string;
//     name: string;
//     email: string;
//     event: string;
//     phone: string;
//     team_id: string;
//     team_members: [];
//     team_lead_id: string;
// }

export type Participant = {
    event_name: string;
    team_id: string;
    team_lead_email: string;
    team_lead_name: string;
    team_lead_phone: string;
    team_lead_roll: string;
    team_members: [{}];
    team_name: string;
    team_type: string;
}


export type Event = {
    id: string;
    name: string;
    type: EventMode;
    duration: string;
    isOpen: boolean;
}