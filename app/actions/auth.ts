'use server'

import { createSupabaseServerClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// 구글 계정으로 회원가입
export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient()
  const origin = (await headers()).get('origin') || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google OAuth 에러:', error)
    // 에러 페이지로 리다이렉트하거나 에러 메시지 반환
    redirect('/login?error=google_auth_failed')
  }

  if (data.url) {
    redirect(data.url)  // Google 로그인 페이지로 리다이렉트
  }
}

// 카카오 계정으로 회원가입
export async function signInWithKakao() {
  const supabase = await createSupabaseServerClient()
  const origin = (await headers()).get('origin') || 'http://localhost:3000'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('카카오 로그인 에러:', error)
    alert("카카오 로그인에 실패했습니다.\n" + error.message)
    return
  }

  if (data.url) {
    redirect(data.url)  // Google 로그인 페이지로 리다이렉트
  }
}

// supabase 비밀번호 설정
export async function setPassword(formData: FormData) {
  const password = formData.get('password') as string

  if (!password || password.length < 6) {
    return { error: '비밀번호는 최소 6자 이상이어야 합니다' }
  }

  const supabase = await createSupabaseServerClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: '로그인 상태가 아닙니다' }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) return { error: error.message }

  return { success: true, message: '패스워드가 설정되었습니다' }
}

// 이메일 + 패스워드 로그인
export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });

  if (error) return { error: error.message };

  redirect('/');
}

// 로그아웃
export async function signOut() {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('로그아웃 에러:', error.message)
    // 에러 발생 시에도 강제로 리다이렉트 (보통은 거의 에러 안 남)
    redirect('/login?error=signout_failed')
  }

  // 성공 시 로그인 페이지나 홈으로
  redirect('/login')
}