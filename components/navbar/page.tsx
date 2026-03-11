'use client'

import type { Profile } from "@/app/types/profile"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import style from './navbar.module.css'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const loadUserAndProfile = async () => {
      // 1. 로그인 유저 정보 가져오기
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        setLoading(false)
        return
      }

      setUser(user)

      // 2. profiles 테이블에서 role 가져오기
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single()

      console.log(data)
      
      setProfile(data as Profile | null)

      setLoading(false)
    }

    loadUserAndProfile()

    // 실시간 리스너 (늦게 올 때 대비)
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[NAVBAR] Auth 변경 감지:', event, session?.user?.id)
      if (session?.user) {
        setUser(session.user)
        setLoading(false)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "사용자"

  const isAdmin = profile?.role === "admin"

  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <div className={style.inner}>
          {/* 좌측 - 로고 */}
          <Link href="/" className={style.logoLink}>
            <span className={style.logoText}>나누리</span>
          </Link>

          {/* 우측 - 유저 정보 또는 로그인 버튼 */}
          <div className={style.rightSection}>
            {loading ? (
              <div className={style.loadingText}>로딩 중...</div>
            ) : user ? (
              <div className={style.userSection}>
                <Link href="/mypage" className={style.userName}>
                  {displayName}
                </Link>
                {/* 관리자일 경우 관리자 페이지 버튼 보여짐 */}
                {isAdmin&& (
                  <Link href="/adminPage" className={`${style.navbar_btn} ${style.admin_btn}`}>
                    관리자 페이지
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={`${style.navbar_btn} ${style.logout_btn}`}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link href="/login" className={`${style.navbar_btn} ${style.login_btn}`}>
                로그인 / 시작하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}