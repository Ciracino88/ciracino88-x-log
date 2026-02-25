"use client"
import { useState } from "react";
import style from "./weekly.module.css"

export default function weekly() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const timelineItems = [
        { time: "10:30", title: "입례송", desc: "다함께" },
        { time: "10:35", title: "사도신경", desc: "다함께" },
        { time: "10:50", title: "경배와 찬양", desc: "다함께" },
        { time: "11:00", title: "대표 기도", desc: "김민진 청년" },
        { time: "11:40", title: "헌금", desc: "다함께" },
        { time: "11:50", title: "성경 낭독", desc: "창세기 6장 5-9절" },
        { time: "12:00", title: "설교", desc: "이 세대를 살리는 한 사람" },
        { time: "12:10", title: "축도", desc: "이충성 목사님" },
        { time: "12:20", title: "광고", desc: "김민진 청년" },
    ];

    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <div className={style.hero_secondary}>
                            <span className={style.date}>2026년 2월 22일 </span>
                            <span className={style.issue}>제26-7호</span>
                        </div>
                        <h1 className={style.hero_title}>이 세대를 살리는 한 사람</h1>
                        <p className={style.hero_subtitle}>이충성 목사님</p>
                    </div>
                </section>
                <section className={style.check}>
                    <h2 className={style.section_title}>예배 전, 체크해볼까요?</h2>
                    <div className={style.check_grid}>
                        <div className={style.check_card}>
                            <div className={style.check_icon}>📖</div>
                            <h3>말씀 준비</h3>
                            <p>오늘 본문 말씀, 미리 살펴볼까요?</p>
                        </div>
                        <div className={style.check_card}>
                            <div className={style.check_icon}>🙏</div>
                            <h3>기도 시간</h3>
                            <p>예배 전, 잠시 기도하는 시간을 가져봅시다</p>
                        </div>
                        <div className={style.check_card}>
                            <div className={style.check_icon}>🎤</div>
                            <h3>찬양 연습</h3>
                            <p>오늘은 어떤 찬양이 준비되어 있을까요?</p>
                        </div>
                    </div>
                </section>
                <section className={style.timeline}>
                    <h2 className={style.section_title}>예배 순서</h2>
                    <div className={style.timeline_container}>
                        <div className={style.timeline_outline}></div>

                        <div className={style.timeline_dots}>
                            {timelineItems.map((item, index) => (
                                <div
                                    className={`${style.timeline_dot} ${activeIndex === index ? style.active : ""}`}
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                >
                                </div>
                            ))}
                        </div>
                        {activeIndex !== null && (
                            <div className={style.timeline_detail_card}>
                                <h3>{timelineItems[activeIndex].title}</h3>
                                <p>{timelineItems[activeIndex].desc}</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

        </div>
    )
}