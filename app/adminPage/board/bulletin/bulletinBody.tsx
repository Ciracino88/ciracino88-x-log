import style from "./bulletin.module.css"
import bibleRaw from "@/public/bible.json"
import type { BibleData, Verse } from "@/app/types/bible";
import { useState, useMemo } from "react";
import FormField from "@/components/form/formField/page";

interface BulletinBodyProps {
    book: string | null;
    chapter: number | null;
    start: number | null;
    end: number | null;
    onUpdateScripture: (key: keyof {
        book: string;
        chapter: number;
        start: number;
        end: number;
    }, value: any) => void
}

// 배열로 전환
const bibleData = bibleRaw as BibleData;

export default function BulletinBody({
    book,
    chapter,
    start,
    end,
    onUpdateScripture
}: BulletinBodyProps) {
    const [toggleResults, setToggleResults] = useState(false);

    // 1. 상속받은 book 을 이용하여 성경 객체 얻기
    const selectedBookObj = useMemo(() => {
        return bibleData.find((b) => b.korean === book) || null;
    }, [book]);

    // 2. 책 목록 옵션
    const bookOptions = useMemo(() => bibleData.map((b) => b.korean), []);

    // 3. 장 목록 옵션
    const chapterOptions = useMemo(() => {
        if (!selectedBookObj) {
            return [];
        }

        return selectedBookObj.chapters.map((ch) => ({
            label: `${ch.chapterNum}장`,
            value: Number(ch.chapterNum)
        }));
    }, [selectedBookObj]);

    // 4. 시작 절 옵션
    const startOptions = useMemo(() => {
        if (!selectedBookObj || !chapter) {
            return [];
        }

        const chapterData = selectedBookObj.chapters.find(
            (ch) => Number(ch.chapterNum) === chapter
        );

        return chapterData ? chapterData.verses.map((v) => ({
            label: `${v.verseNum}절`,
            value: Number(v.verseNum)
        })) : [];
    }, [selectedBookObj, chapter]);

    // 5. 끝 절 옵션
    const endOptions = useMemo(() => {
        if (!selectedBookObj || !chapter || start === null || start === undefined) {
            return [];
        }

        const chapterData = selectedBookObj.chapters.find(
            (ch) => Number(ch.chapterNum) === chapter
        );

        if (!chapterData) {
            return [];
        }

        const startNum = Number(start);

        return chapterData.verses.filter((v) => Number(v.verseNum) >= startNum).map((v) => ({
            label: `${v.verseNum}절`,
            value: Number(v.verseNum)
        }));
    }, [selectedBookObj, chapter, start]);

    return (
        <section className={style.section}>
            <h3>말씀 본문</h3>

            <FormField
                label="책"
                type="select"
                placeholder="책 이름을 입력해주세요"
                options={bookOptions.map(b => ({ label: b, value: b }))}
                value={book}
                onChange={(val) => {
                    onUpdateScripture("book", val);
                    onUpdateScripture("chapter", val);
                }}
            />

            {/* 장 선택: 책이 선택되면 보여짐 */}
            {book && (
                <FormField
                    label="장"
                    type="select"
                    placeholder="장을 입력해주세요"
                    options={chapterOptions}
                    value={chapter}
                    onChange={(val) => {
                        onUpdateScripture("chapter", val);
                        onUpdateScripture("start", null);
                        onUpdateScripture("end", null);
                    }}
                />
            )}

            {/* 시작 절 선택 */}
            {chapter && (
                <FormField
                    label="시작 절"
                    type="select"
                    placeholder="시작 절을 입력해주세요"
                    options={startOptions}
                    value={start}
                    onChange={(val) => {
                        onUpdateScripture("start", val);
                        onUpdateScripture("end", null);
                    }}
                />
            )}

            {/* 끝 절 선택 */}
            {start && (
                <FormField
                    label="끝 절"
                    type="select"
                    placeholder="끝 절을 입력해주세요"
                    options={endOptions}
                    value={end}
                    onChange={(val) => {
                        onUpdateScripture("end", val);
                    }}
                />
            )}
            {selectedBookObj && end && (
                <div className={style.result_section}>
                    <div className={style.result_header}>
                        <h4 className={style.result}>
                            {book} {chapter}장 {start}-{end}
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
                                const chapterData = selectedBookObj.chapters.find(
                                    (ch) => Number(ch.chapterNum) === chapter
                                );

                                if (!chapterData) {
                                    return <p>구절을 불러올 수 없습니다.</p>
                                }

                                // 본문 범위
                                const range = chapterData.verses.filter((v: Verse) => {
                                    const num = Number(v.verseNum);
                                    return num >= (start ?? 0) && num <= (end ?? 0);
                                });

                                // 범위 에러 케이스
                                return range.length > 0
                                    ? range.map((v) => (
                                        <div key={v.verseNum} className={style.verse_card}>
                                            <div className={style.verse_num}>{v.verseNum}절</div>
                                            <div className={style.verse_text}>{v.verse}</div>
                                        </div>
                                    ))
                                    : <p>본문을 찾을 수 없습니다.</p>
                            })()}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}