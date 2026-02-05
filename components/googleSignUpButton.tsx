"use client"

import { supabase } from '@/utils/supabase'

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // 로그인 후 돌아올 페이지 (선택)
        redirectTo: `${window.location.origin}/index`,
        
        // 필요하면 쿼리 파라미터로 추가 정보 전달 가능
        // queryParams: { prompt: 'select_account' }
      },
    })

    if (error) {
      console.error('구글 로그인 에러:', error.message)
      alert('로그인 실패: ' + error.message)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
      Google로 계속하기
    </button>
  )
}