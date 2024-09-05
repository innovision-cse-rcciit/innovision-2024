import * as z from 'zod';
import { addCoordinatorVolunteerSchema } from './add-coordinator-volunteer-schema';

export enum EventMode {
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE"
}

export enum EventCategory {
    TECHNICAL = "TECHNICAL",
    NONTECHNICAL = "NONTECHNICAL",
    GAMING = "GAMING"
}

export const addEventSchema = z.object({
    event_name: z.string().trim().min(1),
    schedule: z.string().trim(),
    min_team_size: z.number().min(1),
    max_team_size: z.number().max(4),
    image_path: z.string().trim(),
    description: z.string().max(20000).trim(),
    rules: z.string().max(20000).trim(),
    coordinator: addCoordinatorVolunteerSchema.array(),
    event_type: z.nativeEnum(EventMode),
    isOpen: z.boolean(),
    event_category: z.nativeEnum(EventCategory)
});