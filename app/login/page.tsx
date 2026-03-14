"use client"

import style from "./login.module.css"
import { loginWithEmail, signInWithGoogle, signInWithKakao } from "../actions/auth";
import { useState, useTransition } from "react";
import Button from "@/components/button/page";

export default function Login() {
    const [isPending, startTransition] = useTransition()
    const [googlePending, setGooglePending] = useState(false)
    const [kakaoPending, setKakaoPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleEmailLogin(formData: FormData) {
        startTransition(async () => {
            const result = await loginWithEmail(formData)
            if (result?.error) {
                setError(result.error)
            }
            // 성공하면 redirect 때문에 여기까지 안 옴
        })
    }

    const handleGoogleLogin = async () => {
        setGooglePending(true)
        try {
            await signInWithGoogle()
        } finally {
            setGooglePending(false)
        }
    }

    const handleKakaoLogin = async () => {
        setKakaoPending(true)
        try {
            await signInWithKakao()
        } finally {
            setKakaoPending(false)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.form}>
                <form action={handleEmailLogin}>
                    <div className={style.form_group}>
                        <label className={style.form_label}>이메일</label>
                        <div className={style.input_wrapper}>
                            <input
                                name="email"
                                type="email"
                                className={style.input}
                                placeholder="이메일을 입력해주세요"
                                required
                            />
                        </div>
                    </div>
                    <div className={style.form_group}>
                        <label className={style.form_label}>패스워드</label>
                        <div className={style.input_wrapper}>
                            <input
                                name="password"
                                type="password"
                                className={style.input}
                                placeholder="패스워드를 입력해주세요"
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <p className={style.error_message}>{error}</p>
                    )}
                    
                    <div className={style.form_group}>
                        <Button
                            type="submit"
                            variant="primary"
                            shape="square"
                            onClick={() => handleEmailLogin}
                        >
                            {isPending ? "로그인 중..." : "로그인"}
                        </Button>
                    </div>
                </form>
                <div className={style.signup_btn_container}>
                    <Button
                        variant="google"
                        onClick={() => handleGoogleLogin}
                    >
                        구글 계정으로 시작하기
                    </Button>
                    <Button
                        variant="kakao"
                        onClick={() => handleKakaoLogin}
                    >
                        카카오 계정으로 시작하기
                    </Button>
                </div>
            </div>
        </div>
    )
}