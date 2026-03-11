"use client";

import style from "./bulletin.module.css";
import { useState } from "react";
import { BulletinSchema } from "@/app/types/bulletinSchema";
import { saveBulletinData } from "./action";
import BulletinHeader from "./bulletinHeader"
import BulletinBody from "./bulletinBody"


export default function Bulletin() {
    // 위 섹션 상태 묶기
    const [bulletinInfo, setBulletinInfo] = useState<{
        date: string | null;
        issue_number: number | null;
        title: string | null;
        preacher: string | null;
        prayer: string | null;
    }>({
        date: "",
        issue_number: 1,
        title: "",
        preacher: "",
        prayer: ""
    });

    // 말씀 본문 상태 묶기
    const [scripture, setScripture] = useState<{
        book: string | null;
        chapter: number | null;
        start: number | null;
        end: number | null;
    }>({
        book: null,
        chapter: null,
        start: null,
        end: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [toggleResults, setToggleResults] = useState(false);

    // 업데이트 함수
    const updateInfo = (key: keyof typeof bulletinInfo, value: string | number | null) => {
        setBulletinInfo(prev => ({ ...prev, [key]: value}));
    };

    const updateScripture = (key: keyof typeof scripture, value: any) => {
        setScripture(prev => ({ ...prev, [key]: value}));
    };

    // 옵셔널 값들의 유효성 검사
    const handleSave = async () => {
        const result = BulletinSchema.safeParse({
            ...bulletinInfo,
            ...scripture
        });

        if (!result.success) {
            alert(result.error.message);
            return;
        }

        setIsSubmitting(true);

        try {
            const saveResult = await saveBulletinData(result.data);

            if (saveResult.success) {
                alert("저장되었습니다.");
            }
        } catch (e) {
            console.error(e);
            alert("저장 중 서버 오류가 발생했습니다");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className={style.container}>
            <main className={style.main}>
                <BulletinHeader
                    date={bulletinInfo.date}
                    issue_number={bulletinInfo.issue_number}
                    title={bulletinInfo.title}
                    preacher={bulletinInfo.preacher}
                    selected_prayer={bulletinInfo.prayer}
                    onUpdateInfo={updateInfo}
                />
                <BulletinBody
                    book={scripture.book}
                    chapter={scripture.chapter}
                    start={scripture.start}
                    end={scripture.end}
                    onUpdateScripture={updateScripture}
                />
                <button
                    className={style.submit_btn}
                    onClick={handleSave}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "저장 중..." : "저장"}
                </button>
            </main>
        </div>
    )
}