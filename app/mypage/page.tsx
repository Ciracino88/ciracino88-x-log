'use client'

import { setPassword } from '@/app/actions/auth'
import { useState, useTransition } from 'react'
import style from "./mypage.module.css"

export default function SetPasswordForm() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await setPassword(formData)

      if (result?.error) {
        setError(result.error)
        setMessage('')
      } else if (result?.success) {
        setMessage(result.message || '패스워드가 설정되었습니다!')
        setError('')
      }
    })
  }

  return (
    <div className={style.container}>
        <div className={style.card}>
            <h2 className={style.card_title}>패스워드 설정</h2>
            <form
                action={handleSubmit}
                className={style.form}
            >
                <div className={style.input_group}>
                    <label htmlFor='password' className={style.input_label}>새 패스워드</label>
                    <input
                        id="password"
                        name="password"
                        type='password'
                        required
                        minLength={6}
                        placeholder='6자 이상 입력해주세요'
                        disabled={isPending}
                        className={style.input_field}
                    />
                </div>
                <button
                    type='submit'
                    disabled={isPending}
                    className={`${style.submit_btn} ${isPending ? "loading" : ""}`}
                >
                    {isPending ? "설정 중..." : "저장"}
                </button>
                { error && <p className={style.error_text}>{error}</p>}
                { message && <p className={style.message}>{message}</p>}
            </form>
        </div>
    </div>
  )
}