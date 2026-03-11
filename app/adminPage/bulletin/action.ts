"use server"

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveBulletinData(formData: {
    date: string;
    issue_number: number;
    title: string;
    preacher: string;
    prayer: string;
    book: string;
    chapter: number;
    start: number;
    end: number;
}) {
    const supabase = await createSupabaseServerClient();

    // 로그인 유저 정보 가져오기
    const { data: {user}, error: authError} = await supabase.auth.getUser();

    if (authError || !user) {
        return { success: false, error: "로그인이 필요합니다."};
    }

    const { error } = await supabase
        .from("bulletins")
        .insert([
            {
                date: formData.date,
                issue_number: formData.issue_number,
                title: formData.title,
                preacher: formData.preacher,
                prayer: formData.prayer,
                book: formData.book,
                chapter: formData.chapter,
                start: formData.start,
                end: formData.end,
                user_id: user.id // RLS 정책 준수를 위한 값
            }
        ]);
    
        if (error) {
            console.error("DB ERROR: ", error.message);
            return {
                success: false,
                error: "저장 중 오류가 발생했습니다."
            };
        }

        // 페이지 데이터 갱신
        revalidatePath("/adminPage/weeklyEditPage");

        return { success: true };
}