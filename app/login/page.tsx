"use client"

import CustomButton from "@/components/customButton/customButton"
import style from "./login.module.css"

export default function Login() {
    const  handleLogin = () => {
        alert("로그인!")
    }

    return(
        <div>
            <form className={style.login_container}>
                <h4 className={style.login_title}>Login</h4>
                <input
                    className={style.login_input}
                    type="text"
                    placeholder="Email"
                    required
                />
                <input
                    className={style.login_input}
                    type="password"
                    placeholder="Password"
                    required
                />
                <br></br>
                <CustomButton onClick={handleLogin}>로그인</CustomButton>
                <a href="/signUp">나누리 계정이 없다면?</a>
            </form>
        </div>
    )
}