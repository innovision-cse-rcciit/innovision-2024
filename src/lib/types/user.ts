import { User } from "@supabase/supabase-js";

export interface IUser extends User {
    name: string;
    email: string;
    phone: string;
    college_roll: string;
    department: string;
    year: string;
}