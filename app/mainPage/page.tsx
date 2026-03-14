import style from "./mainPage.module.css"
import Link from "next/link"
import Card from "@/components/card/card"
import { mainPageFeatures } from "../data/mainPageMenus"
import { mainPageMenus } from "../data/mainPageMenus"

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
                    <h2 className={style.section_title}>나누리를 만나고 싶다면?</h2>
                    <div className={style.feature_grid}>
                        {mainPageFeatures.map((feature, idx) => (
                            <Card
                                key={idx}
                                emoji={feature.emoji}
                                title={feature.title}
                                desc={feature.desc}
                            />
                        ))}
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
                            <h3>승인</h3>
                            <p>목사님의 승인을 통해 나누리 맴버가 되세요</p>
                        </div>
                        <div className={style.step_item}>
                            <div className={style.step_number}>3</div>
                            <div></div>
                            <h3>셀 배정</h3>
                            <p>셀을 배정받고 나누리와 함께하세요</p>
                        </div>
                    </div>
                </section>
                <section className={style.menus}>
                    <h2 className={style.section_title}>나누리 살펴보기</h2>
                    <div className={style.menus_grid}>
                        {mainPageMenus.map((menu, idx) => (
                            <Link className={style.link} href={menu.link} key={idx}>
                                <Card
                                    emoji={menu.emoji}
                                    title={menu.title}
                                    desc={menu.desc}
                                />
                            </Link>
                        ))}
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