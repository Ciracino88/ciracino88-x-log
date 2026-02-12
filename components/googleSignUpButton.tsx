"use client"

import { supabase } from '@/utils/supabase'
import CustomButton from './customButton/customButton'

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // 로그인 후 돌아올 페이지 (선택)
        redirectTo: `${window.location.origin}/todoList`,
        
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
    <CustomButton
      onClick={handleGoogleLogin}
    >
      Google로 계속하기
    </CustomButton>
  )
}