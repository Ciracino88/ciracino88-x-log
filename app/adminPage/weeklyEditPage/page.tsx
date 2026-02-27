"use client";

import style from "./weeklyEditPage.module.css";
import Calendar from "@/components/calendar/page";
import Select from "react-select";

export default function WeeklyEditPage() {

    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.section}>
                    <div className={style.card}>
                        <div className={style.field}>
                            <label>날짜</label>
                            <Calendar/>
                        </div>
                        <div className={style.field}>
                            <label>호수</label>
                            <input
                                type="number"
                                className={style.input}
                                placeholder="1"
                                max={53}
                                min={1}
                            />
                        </div>
                        <div className={style.field}>
                            <label>제목</label>
                            <input
                                type="text"
                                className={style.input}
                                placeholder="제목을 입력해주세요"
                            />
                        </div>
                        <div className={style.field}>
                            <label>설교자</label>
                            <input
                                type="text"
                                className={style.input}
                                placeholder="이름을 입력해주세요"
                            />
                        </div>
                    </div>
                </section>
                <section className={style.section}>
                    <div className={style.card}>
                        <div className={style.field}>
                            <label>대표기도</label>
                            <input
                                type="text"
                                className={style.input}
                                placeholder="이름을 입력해주세요"
                            />
                        </div>
                        <div className={style.field}>
                            <label>말씀 본문</label>
                            <input
                                type="text"
                                className={style.input}
                                placeholder="창세기 1장 1-5"
                            />
                        </div>
                    </div>
                </section>
                <section className={style.section}>
                    {/* 광고 */}
                    <div className={style.adSection}>
                        <h3 className={style.section_title}>나누리 소식</h3>
                        <div className={style.adCard}>
                            <div className={style.adHeader}>주일예배</div>
                            <div className={style.adContent}>
                                오늘 하루의 삶을 예배가 승리하게 한다!<br/>
                                26년 주제: 말씀이 나를 이끌게 한다
                            </div>
                        </div>
                        <div className={style.adCard}>
                            <div className={style.adHeader}>예배시간 변경</div>
                            <div className={style.adContent}>
                                오늘부터 청년부 예배는 오후 1시 30분에 시작합니다.
                            </div>
                        </div>
                        <div className={style.emptyAd}>
                            <button className={style.addButton}>+ 광고 추가하기</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}