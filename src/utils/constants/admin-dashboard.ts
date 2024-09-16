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
    college_roll: string;
}

export type Participant = {
    id: string;
    name: string;
    email: string;
    event: string;
    phone: string;
    team_id: string;
    team_lead_id: string;
    team_members: TeamMember[];
    team_type?: string;
    team_name?: string;
    team_lead_name?: string;
};

export type TeamMember = {
    id: string;
    name: string;
    email: string;
    phone: string;
    event_id: EventDetails;
    team_id: string;
};

export type EventDetails = {
    event_name: string;
};



export type Event = {
    id: string;
    name: string;
    type: EventMode;
    duration: string;
    isOpen: boolean;
}