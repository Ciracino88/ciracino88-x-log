"use client"

import style from "./login.module.css"
import { loginWithEmail, signInWithGoogle } from "../actions/auth";
import { useState, useTransition } from "react";
import CustomButton from "@/components/customButton/customButton";

export default function Login() {
    const [isPending, startTransition] = useTransition()
    const [googlePending, setGooglePending] = useState(false)
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
                        <CustomButton
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? "로그인 중..." : "로그인"}
                        </CustomButton>
                    </div>
                </form>
                <div className={style.form_group}>
                    <CustomButton onClick={handleGoogleLogin} className={style.signUp_btn}>
                        <span className={style.normal_text}>나누리 계정이 없다면?</span>
                        <span className={style.hover_text}>Google 계정으로 시작하기</span>
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}