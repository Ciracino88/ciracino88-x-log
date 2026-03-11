import style from "./bulletin.module.css"
import AutocompleteField from "@/components/autocompleteField/page";
import bibleRaw from "@/public/bible.json"
import type { BibleData, Verse } from "@/app/types/bible";
import { useState, useMemo } from "react";

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

        return selectedBookObj.chapters.map((ch) => `${ch.chapterNum}장`);
    }, [selectedBookObj]);

    // 4. 시작 절 옵션
    const startOptions = useMemo(() => {
        if (!selectedBookObj || !chapter) {
            return [];
        }

        const chapterData = selectedBookObj.chapters.find(
            (ch) => Number(ch.chapterNum) === chapter
        );

        return chapterData ? chapterData.verses.map((v) => `${v.verseNum}절`) : [];
    }, [selectedBookObj, chapter]);

    // 5. 끝 절 옵션
    const endOptions = useMemo(() => {
        if (!selectedBookObj || !chapter || !start) {
            return [];
        }

        const chapterData = selectedBookObj.chapters.find(
            (ch) => Number(ch.chapterNum) === chapter
        );

        if (!chapterData) {
            return [];
        }

        return chapterData.verses.filter((v) => Number(v.verseNum) >= start).map((v) => `${v.verseNum}절`);
    }, [selectedBookObj, chapter, start]);

    return (
        <section className={style.section}>
            <div className={style.adSection}>
                <h3 className={style.section_title}>말씀 본문</h3>
                <div className={style.card}>
                    <div className={style.field}>
                        <label>책</label>
                        <AutocompleteField
                            options={bookOptions}
                            placeholder="책 이름을 입력해주세요"
                            value={book}
                            onChange={(_, newValue) => {
                                onUpdateScripture("book", newValue);
                                onUpdateScripture("chapter", null); // 책 장이 바뀌면 하위 값을 초기화
                            }}
                        />
                    </div>
                    {book && (
                        <div className={style.field}>
                            <label>장</label>
                            <AutocompleteField
                                options={chapterOptions}
                                placeholder="장을 입력해주세요"
                                value={chapter ? `${chapter}장` : null}
                                onChange={(_, newValue) => {
                                    const val = newValue ? Number(newValue.replace("장", "")) : null;
                                    onUpdateScripture("chapter", val);
                                    onUpdateScripture("start", null);
                                }}
                            />
                        </div>
                    )}
                    {chapter && (
                        <div className={style.field}>
                            <label>절</label>
                            <AutocompleteField
                                options={startOptions}
                                placeholder="시작 절을 입력해주세요"
                                value={start ? `${start}절` : null}
                                onChange={(_, newValue) => {
                                    const val = newValue ? Number(newValue.replace("절", "")) : null;
                                    onUpdateScripture("start", val);
                                    onUpdateScripture("end", null);
                                }}
                            />
                        </div>
                    )}
                    {start && (
                        <div className={style.field}>
                            <label>절</label>
                            <AutocompleteField
                                options={endOptions}
                                placeholder="끝 절을 입력해주세요"
                                value={end ? `${end}절` : null}
                                onChange={(_, newValue) => {
                                    const val = newValue ? Number(newValue.replace("절", "")) : null;
                                    onUpdateScripture("end", val);
                                }}
                            />
                        </div>
                    )}
                </div>
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
            </div>
        </section>
    )
}