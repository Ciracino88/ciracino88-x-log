export default function Login() {
  return(
    <div>
        <form className="login-container">
            <h4 className="login-title">Login</h4>
            <input
                className="login-input"
                type="text"
                placeholder="Email"
                required
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                required
            />
            <br></br>
            <button className="login-btn">로그인</button>
            <a href="/signUp">나누리 계정이 없다면?</a>
        </form>
    </div>
  )
}