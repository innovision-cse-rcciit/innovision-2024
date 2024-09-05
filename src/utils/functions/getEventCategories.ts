import { supabase } from "@/lib/supabase-client";

export const getEventCategories = async() => {
    try{
        const {data,error} = await supabase.from('event_categories').select('*');
        if(error) throw error;
        return data;
    }
    catch(error){
        console.log(error)
    }
};