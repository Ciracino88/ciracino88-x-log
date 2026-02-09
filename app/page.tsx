export default function About() {
    const about_profile_members = [
        "담임 목사 김만수",
        "담당 교역자 이충성",
        "회장 김진규",
        "부회장 유수민",
        "총무 김민진",
        "서기 조은혜",
        "회계 이승호"
    ]
    return(
        <div className="about-container">
            <h1 className="about-title">
                <span>수고하고 무거운 짐 진 자들아</span>
                <br></br>
                <span style={{ color: "#f29886" }}>다 내게로 오라</span>    
            </h1>
            <span className="about-title-sub">마태복음 11장 28절</span>
            <p className="about-secondary">
                말씀과 예배로 하루를 승리하는 삶
                <br></br>
                함께 성장하고 서로를 세워가는 공동체
                <br></br>
                나누리 청년, 지금 당신을 기다립니다!
            </p>
            <div className="about-a-container">
                <a className="about-a" href="/signUp">Start with Nanuri</a>
                <a className="about-a" href="/login">Login</a>
            </div>
            <div className="about-profile-flow-container">
                <div className="about-profile-flow-content">
                    {about_profile_members.map((member, i) => (
                        <span className="about-profile-member-name" key={i}>{ member }</span>
                    ))}

                    {about_profile_members.map((member, i) => (
                        <span className="about-profile-member-name" key={i}>{ member }</span>
                    ))}
                </div>
            </div>
            <span className="about-profile-flow-bottom">
                Together with <a className="about-profile-link" href="/profile">co-laborers</a> called by Jesus
            </span>
            <div className="about-cards-container">
                <a href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%9D%98%EC%99%95%EC%8B%9C+%EC%99%95%EB%A6%BC%EA%B8%B8+47-4/data=!4m6!3m5!1s0x357b5db72f09b851:0xde7cbc28971b5f6d!8m2!3d37.3459406!4d126.9884552!16s%2Fg%2F11bzft2ndh?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" className="about-card">
                    <div className="about-card-top">
                        <h4 className="about-card-top-title">장소 및 시간</h4>
                        <span className="about-card-icon">
                            <img src="location.png"></img>
                        </span>
                        <br/><br/><br/><br/>
                        <span>
                            오후 2시
                            <br></br>
                            의왕시 왕림길 47-4
                            <br></br>
                            고천성결교회
                        </span>
                    </div>
                </a>
                <div className="about-card">
                    <div className="about-card-top">
                        <h4 className="about-card-top-title">누리엘</h4>
                        <span className="about-card-icon">
                            <img src="artist.png"></img>
                        </span>
                        <br/><br/><br/><br/>
                        <span>
                            실력이 아닌 마음으로.
                            <br></br>
                            찬양으로 주님을 섬기고 싶다면
                            <br></br>
                            언제나 대환영!
                        </span>
                    </div>
                </div>
                <a href="/account" className="about-card">
                    <div className="about-card-top">
                        <h4 className="about-card-top-title">주보</h4>
                        <span className="about-card-icon">
                            <img src="infomation.png"></img>
                        </span>
                        <br/><br/><br/><br/>
                        <span>
                            말씀이 나를 이끌게 한다!
                            <br></br>
                            이번 주는 어떤 말씀이
                            <br></br>
                            우리를 기다리고 있을까요?
                        </span>
                    </div>
                </a>
                <a href="https://www.instagram.com/nanuri_gram/" className="about-card">
                    <div className="about-card-top">
                        <h4 className="about-card-top-title">인스타그램</h4>
                        <span className="about-card-icon">
                            <img src="star.png"></img>
                        </span>
                        <br/><br/><br/><br/>
                        <span>
                            나누리 최신 소식을 만나보세요
                            <br></br>
                            @nanuri_gram
                        </span>
                    </div>
                </a>
            </div>
        </div>
    )
}