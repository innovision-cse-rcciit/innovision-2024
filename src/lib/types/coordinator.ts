import { Role } from "../schema/add-coordinator-volunteer-schema";

export type ICoordinator = {
    name: string;
    email: string,
    role: Role
};