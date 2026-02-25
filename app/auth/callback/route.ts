import { createSupabaseServerClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 1. 현재 URL에서 code 파라미터 가져오기
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log("callback 도착 url: ", request.url)
  console.log("callback 추출 code: ", code)
  console.log("callback code 유무: ", !!code)

  // 2. 코드가 없으면 로그인 페이지로 돌려보내기
  if (!code) {
    console.log("callback code 없음")
    return NextResponse.redirect(
      new URL('/login?error=no_code_provided', request.url)
    )
  }
  
  try {
    const supabase = await createSupabaseServerClient()
    console.log("callback supabase 클라이언트 생성 완료")

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log("callback 코드 교환 data 유무: ", !!data)

    if (error) {
      console.error("코드 교환 실패: ", error.message)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
      )
    }

    // 성공 -> 메인 페이지로 이동
    console.log('[CALLBACK] 성공 → 홈으로 리다이렉트')
    return NextResponse.redirect(requestUrl.origin + '/')
  } catch (err) {
    console.log("callback 처리 중 에러 발생: ", err)
    return NextResponse.redirect(
      new URL('/login?error=callback_exception', request.url)
    )
  }
}