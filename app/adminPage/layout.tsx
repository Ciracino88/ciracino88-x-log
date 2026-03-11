import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 관리자 권한 체크
    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", user.id)
            .single();

        // role 값을 통해 admin 판단
        if (profile?.role !== "admin") {
            redirect("/?error=unauthorized");
        }
    } else {
        redirect("/login");
    }

    return<>{children}</>
}