import style from "./mainPage.module.css"
import Link from "next/link"

export default function MainPage() {
    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <h1 className={style.hero_title}>
                            수고하고 짐 진 자들아, 다 내게로 오라
                        </h1>
                        <p className={style.hero_subtitle}>
                            말씀과 예배로 하루를 승리하는 삶.<br />
                            함께 성장하고 서로를 세워가는 공동체.<br />
                            <strong>나누리 청년</strong>, 지금 당신을 기다립니다!
                        </p>
                        <div className={style.stats}>
                            <div className={style.stat_item}>
                                <span className={style.stat_number}>60</span>
                                <span className={style.stat_label}>나누리 바이블</span>
                            </div>
                            <div className={style.stat_item}>
                                <span className={style.stat_number}>13</span>
                                <span className={style.stat_label}>성경 읽기</span>
                            </div>
                        </div>
                        <a href="#" className={style.cta_btn}>나누리 둘러보기</a>
                    </div>
                </section>
                <section className={style.features}>
                    <h2 className={style.section_title}>나누리, 무엇을 하나요?</h2>
                    <div className={style.feature_grid}>
                        <div className={style.feature_card}>
                            <div className={style.feature_icon}>🎯</div>
                            <h3>삶을 통해 보여주는 나누리</h3>
                            <p>나누리는 삶 속 행실을 통해 하나님을 증명합니다.</p>
                        </div>
                        <div className={style.feature_card}>
                            <div className={style.feature_icon}>⚡</div>
                            <h3>실시간 업데이트</h3>
                            <p>나누리는 실시간으로 성장하고, 새로운 것에 도전합니다.</p>
                        </div>
                        <div className={style.feature_card}>
                            <div className={style.feature_icon}>✨</div>
                            <h3>하나님이 중심되는 곳</h3>
                            <p>나누리는 하나님의 뜻을 구하며 나아갑니다.</p>
                        </div>
                    </div>
                </section>
                <section className={style.steps}>
                    <h2 className={style.section_title}>간단한 3단계로 시작하세요</h2>
                    <div className={style.step_grid}>
                        <div className={style.step_item}>
                            <div className={style.step_number}>1</div>
                            <div></div>
                            <h3>회원가입</h3>
                            <p>무료로 계정을 생성하고 시작하세요</p>
                        </div>
                        <div className={style.step_item}>
                            <div className={style.step_number}>2</div>
                            <div></div>
                            <h3>회원가입</h3>
                            <p>무료로 계정을 생성하고 시작하세요</p>
                        </div>
                        <div className={style.step_item}>
                            <div className={style.step_number}>3</div>
                            <div></div>
                            <h3>회원가입</h3>
                            <p>무료로 계정을 생성하고 시작하세요</p>
                        </div>
                    </div>
                </section>
                <section className={style.menus}>
                    <h2 className={style.section_title}>나누리 살펴보기</h2>
                    <div className={style.menus_grid}>
                        <Link href="/executives" className={style.menus_card_link}>
                            <div className={style.menus_card}>
                                <div className={style.menus_icon}>🫡</div>
                                <h3>임원진</h3>
                                <p>주님의 사역에 헌신하는 동역자들</p>
                            </div>
                        </Link>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>🗺️</div>
                            <h3>장소</h3>
                            <p>나누리 위치가 궁금하다면?</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📆</div>
                            <h3>캘린더</h3>
                            <p>나누리 일정을 한 눈에 살펴보세요</p>
                        </div>
                        <Link href="/weekly" className={style.menus_card_link}>
                            <div className={style.menus_card}>
                                <div className={style.menus_icon}>🗞️</div>
                                <h3>주보</h3>
                                <p>이번 주는 어떤 말씀이 기다리고 있을까요?</p>
                            </div>
                        </Link>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>▶️</div>
                            <h3>유튜브</h3>
                            <p>목사님 설교를 다시 듣고 싶다면?</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>🌟</div>
                            <h3>인스타그램</h3>
                            <p>나누리를 인스타에서 만나보세요</p>
                        </div>
                    </div>
                </section>
                <section className={style.log_section}>
                    <div className={style.log_content}>
                        <h2 className={`${style.section_title} ${style.footer}`}>오늘부터 시작하는 나누리 로그</h2>
                        <p className={style.log_desc}>말씀과 기도, 삶의 기록을 나누며 함께 성장합니다.</p>
                        <a href="#" className={style.log_btn}>로그 시작하기</a>
                    </div>
                </section>
            </main>
        </div>
    )
}