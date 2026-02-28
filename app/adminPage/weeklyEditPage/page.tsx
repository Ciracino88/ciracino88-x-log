"use client";

import style from "./weeklyEditPage.module.css";
import Calendar from "@/components/calendar/page";
import AutocompleteField from "@/components/autocompleteField/page";
import bibleRaw from "@/public/bible.json"
import { useState, useMemo, useEffect } from "react";
import type { BibleBook, BibleData, Chapter, Verse } from "@/app/types/bible";

// 배열로 전환
const bibleData = bibleRaw as BibleData;


export default function WeeklyEditPage() {
    // 선택한 대표 기도 (RS = representative)
    const [selectedRS, setSelectedRS] = useState<string | null>(null);
    // 선택한 성경책
    const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
    // 선택한 장
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    // 선택한 시작절
    const [selectedStart, setSelectedStart] = useState<string | null>(null);
    // 선택한 끝절
    const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
    // 본문 확인하기 활성화 트리거
    const [toggleResults, setToggleResults] = useState(false);

    // 책 이름 옵션
    const bookOptions = useMemo(() =>
        bibleData.map(book => book.korean),
        []);

    // 선택한 책의 장 옵션
    const chapterOptions = useMemo(() => {
        if (!selectedBook) {
            return [];
        }

        return selectedBook.chapters.map((ch: Chapter) => `${ch.chapterNum}장`)
    }, [selectedBook]);

    // 선택한 장의 시작 절 옵션
    const startOptions = useMemo(() => {
        if (!selectedBook || !selectedChapter) {
            return [];
        }

        const chapter = selectedBook.chapters.find(
            (ch: Chapter) => ch.chapterNum === selectedChapter
        );

        if (!chapter) {
            return [];
        }

        return chapter.verses.map((v: Verse) => `${v.verseNum}절`)
    }, [selectedBook, selectedChapter]);

    // 선택한 장의 끝 절 옵션
    const endOptions = useMemo(() => {
        if (!selectedBook || !selectedChapter || !selectedStart) {
            return [];
        }

        const chapter = selectedBook.chapters.find(
            (ch: Chapter) => ch.chapterNum === selectedChapter
        );

        if (!chapter) {
            return [];
        }

        const start = Number(selectedStart);

        const end = chapter.verses.filter((v: Verse) => {
            const verse = Number(v.verseNum);
            return verse >= start;
        });

        return end.map((v: Verse) => `${v.verseNum}`);

    }, [selectedBook, selectedChapter, selectedStart]);

    // 책이 바뀌면 장과 절을 모두 초기화
    useEffect(() => {
        setSelectedChapter(null);
        setSelectedStart(null);
        setSelectedEnd(null);
    }, [selectedBook]);

    useEffect(() => {
        setSelectedStart(null);
        setSelectedEnd(null);
    }, [selectedChapter]);

    useEffect(() => {
        setSelectedEnd(null);
    }, [selectedStart]);


    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.section}>
                    <div className={style.card}>
                        <div className={style.field}>
                            <label>날짜</label>
                            <Calendar />
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
                        <div className={style.field}>
                            <label>대표기도</label>
                            <AutocompleteField
                                options={[
                                    "김진규",
                                    "유수민",
                                    "김예찬",
                                    "김예지",
                                    "이승호",
                                    "변형섭",
                                    "김민진"
                                ]}
                                value={selectedRS}
                                onChange={(_, newValue) => {
                                    setSelectedRS(newValue);
                                }}
                            />
                        </div>
                    </div>
                </section>
                <section className={style.section}>
                    <div className={style.adSection}>
                        <h3 className={style.section_title}>말씀 본문</h3>
                        <div className={style.card}>
                            <div className={style.field}>
                                <label>책</label>
                                <AutocompleteField
                                    options={bookOptions}
                                    placeholder="책 이름을 입력해주세요"
                                    value={selectedBook?.korean ?? null}
                                    onChange={(_, newValue) => {
                                        if (!newValue) {
                                            setSelectedBook(null);
                                            return;
                                        }
                                        const book = bibleData.find(b => b.korean === newValue);
                                        setSelectedBook(book ?? null);
                                    }}
                                />
                            </div>
                            {selectedBook && (
                                <div className={style.field}>
                                    <label>장</label>
                                    <AutocompleteField
                                        options={chapterOptions}
                                        placeholder="장을 입력해주세요"
                                        value={selectedChapter}
                                        onChange={(_, newValue) => {
                                            setSelectedChapter(`${newValue?.replace("장", "")}`);
                                        }}
                                    />
                                </div>
                            )}
                            {selectedChapter && (
                                <div className={style.field}>
                                    <label>절</label>
                                    <AutocompleteField
                                        options={startOptions}
                                        placeholder="시작 절을 입력해주세요"
                                        value={selectedStart}
                                        onChange={(_, newValue) => {
                                            setSelectedStart(`${newValue?.replace("절", "")}`);
                                        }}
                                    />
                                </div>
                            )}
                            {selectedStart && (
                                <div className={style.field}>
                                    <label>절</label>
                                    <AutocompleteField
                                        options={endOptions}
                                        placeholder="끝 절을 입력해주세요"
                                        value={selectedEnd}
                                        onChange={(_, newValue) => {
                                            setSelectedEnd(`${newValue?.replace("절", "")}`);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        {selectedBook && selectedEnd && (
                            <div className={style.result_section}>
                                <div className={style.result_header}>
                                    <h4 className={style.result}>
                                        {selectedBook.korean} {selectedChapter}장 {selectedStart}-{selectedEnd}
                                    </h4>
                                    <button
                                        className={style.result_view_btn}
                                        onClick={() => setToggleResults(prev => !prev)}
                                    >
                                        {toggleResults ? "본문 접기" : "본문 보기"}                                        
                                    </button>
                                </div>
                                {toggleResults && (
                                    <div className={style.verse_card_container}>
                                        {(() => {
                                            const chapter = selectedChapter;
                                            const start = Number(selectedStart);
                                            const end = Number(selectedEnd);

                                            const chapterData = selectedBook.chapters.find(
                                                (ch: Chapter) => ch.chapterNum === chapter
                                            );

                                            if (!chapterData) {
                                                return <p>구절을 불러올 수 없습니다.</p>
                                            }

                                            // 본문 범위
                                            const range = chapterData.verses.filter((v: Verse) => {
                                                const num = Number(v.verseNum);
                                                return num >= start && num <= end;
                                            });

                                            // 범위가 0이면 오류
                                            if (range.length === 0) {
                                                return <p>본문을 찾을 수 없습니다.</p>
                                            }

                                            // 정상 루트
                                            return range.map((v: Verse) => (
                                                <div key={v.verseNum} className={style.verse_card}>
                                                    <div className={style.verse_num}>{v.verseNum}절</div>
                                                    <div className={style.verse_text}>{v.verse}</div>
                                                </div>
                                            ));
                                        }) ()}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
                <section className={style.section}>
                    {/* 광고 */}
                    <div className={style.adSection}>
                        <h3 className={style.section_title}>나누리 소식</h3>
                        <div className={style.adCard}>
                            <div className={style.adHeader}>주일예배</div>
                            <div className={style.adContent}>
                                오늘 하루의 삶을 예배가 승리하게 한다!<br />
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
                <button className={style.submit_btn}>
                    저장
                </button>
            </main>
        </div>
    )
}