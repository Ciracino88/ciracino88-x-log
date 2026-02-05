import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase 환경 변수가 설정되지 않았습니다. " +
    ".env 파일에 REACT_APP_SUPABASE_URL과 REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY를 확인하세요."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);