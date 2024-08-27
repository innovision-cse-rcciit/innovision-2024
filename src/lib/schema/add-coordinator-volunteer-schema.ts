import * as z from 'zod';

export enum Role {
    COORDINATOR = "COORDINATOR",
    VOLUNTEER = "VOLUNTEER"
}

export const addCoordinatorVolunteerSchema = z.object({
    name: z.string().trim(),
    email: z.string().email().trim(),
    role: z.nativeEnum(Role)
})