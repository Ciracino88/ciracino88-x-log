'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './navbar.module.css' // 또는 tailwind 사용 시 className으로

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const forceCheckUser = async (attempt = 1) => {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log(`[NAVBAR] 시도 ${attempt}회 - user:`, user, 'error:', error)

      if (user) {
        setUser(user)
        setLoading(false)
        return
      }

      // 3번까지 시도 (지연 대비)
      if (attempt < 3) {
        setTimeout(() => forceCheckUser(attempt + 1), 800) // 0.8초 간격
      } else {
        setLoading(false)
      }
    }

    forceCheckUser(1) // 즉시 1회

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* 좌측 - 로고 */}
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>나누리</span>
          </Link>

          {/* 우측 - 유저 정보 또는 로그인 버튼 */}
          <div className={styles.rightSection}>
            {loading ? (
              <div className={styles.loadingText}>로딩 중...</div>
            ) : user ? (
              <div className={styles.userSection}>
                <Link href="/mypage" className={styles.userName}>
                  {displayName}
                </Link>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                로그인 / 시작하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}