import style from "./executives.module.css"

export default function Executives() {
    return(
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <h1 className={style.hero_title}>
                            나누리 청년부 임원진
                        </h1>
                        <p className={style.hero_subtitle}>
                            직책이 아니라 섬김으로 부름받은 이들
                        </p>
                    </div>
                </section>
                <section className={style.team}>
                    <h2 className={style.section_title}>우리를 소개합니다</h2>
                    <div className={style.team_grid}>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄찌</h3>
                            <p className={style.team_role}>담당 목사</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄토리</h3>
                            <p className={style.team_role}>회장</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄순이</h3>
                            <p className={style.team_role}>부회장</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄조아</h3>
                            <p className={style.team_role}>총무</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄햄햄</h3>
                            <p className={style.team_role}>서기</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                        <div className={style.team_card}>
                            <div className={style.team_photo_wrapper}>
                                <img
                                    src="/images/logo.jpg"
                                    alt="이름"
                                    className={style.team_photo}
                                />
                            </div>
                            <h3 className={style.team_name}>김햄들어</h3>
                            <p className={style.team_role}>회계</p>
                            <p className={style.team_desc}>삶 속에서 주님을 드러내는 법을 가르치고 있습니다.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}