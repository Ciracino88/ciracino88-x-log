"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function getLatestBulletin() {
    const supabase = await createSupabaseServerClient();

    try {
        const { data, error } = await supabase
            .from("bulletins")
            .select("*")
            .order("date", { ascending: false })
            .limit(1)
            .single();

        console.log(data);
        if (error) {
            if (error.code === 'PGRST116') return { success: true, data: null };
            throw error;
        }

        return { success: true, data };
    } catch (e) {
        console.error(e);
        return { success: false, error: "최신 주보를 불러오지 못했습니다."}
    }
}