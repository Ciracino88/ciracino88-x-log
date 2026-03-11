"use client"
import { useState, useEffect } from "react";
import style from "./weekly.module.css"
import { getLatestBulletin } from "./action";

export default function weekly() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const timelineItems = [
        "입례송",
        "사도신경",
        "경배와 찬양",
        "대표 기도",
        "헌금",
        "성경 낭독",
        "설교",
        "축도",
        "주기도문"
    ];

    const [bulletinInfo, setBulletinInfo] = useState({
        date: "",
        issue_number: 1,
        title: "",
        preacher: "",
        prayer: "",
        book: "",
        chapter: 1,
        start: 1,
        end: 1

    })

    useEffect(() => {
        const load = async () => {
            const result = await getLatestBulletin();

            if (result.success && result.data) {
                const latest = result.data;

                setBulletinInfo({
                    date: latest.date || "",
                    issue_number: latest.issue_number,
                    title: latest.title || "",
                    preacher: latest.preacher || "",
                    prayer: latest.prayer || "",
                    book: latest.book || "",
                    chapter: latest.chapter || 1,
                    start: latest.start || 1,
                    end: latest.end || 1
                })
            }
        };
        load();
    }, []);

    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <div className={style.hero_secondary}>
                            <span className={style.date}>2026년 2월 22일 </span>
                            <span className={style.issue}>{`제 ${bulletinInfo.date.split("-")[0].slice(-2)}-${bulletinInfo.issue_number}호`}</span>
                        </div>
                        <h1 className={style.hero_title}>{bulletinInfo.title}</h1>
                        <p className={style.hero_subtitle}>{bulletinInfo.preacher} 목사님</p>
                    </div>
                </section>
                <section className={style.check}>
                    <h2 className={style.section_title}>예배 전, 체크해볼까요?</h2>
                    <div className={style.check_grid}>
                        <div className={style.check_card}>
                            <div className={style.check_icon}>📖</div>
                            <h3>말씀 리뷰</h3>
                            <p>지난 주 말씀, 한 번 살펴볼까요?</p>
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
                                <h3>{timelineItems[activeIndex]}</h3>
                                {[3, 5, 6, 7].includes(activeIndex) ? (
                                    <>
                                        { activeIndex === 3 && (
                                            <p>{bulletinInfo.prayer} 청년</p>
                                        )}
                                        { activeIndex === 5 && (
                                            <p>{bulletinInfo.book} {bulletinInfo.chapter}장 {bulletinInfo.start}-{bulletinInfo.end}절</p>
                                        )}
                                        { (activeIndex === 6 || activeIndex === 7) && (
                                            <p>{bulletinInfo.preacher} 목사님</p>
                                        )}
                                    </>
                                ) : (
                                    <p>다함께</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

        </div>
    )
}