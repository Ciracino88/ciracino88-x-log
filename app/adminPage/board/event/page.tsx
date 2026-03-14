"use client"

import AdminHeader from "@/components/adminHeader/page"
import style from "./event.module.css"
import { useState } from "react"

export default function Event() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <main className={style.container}>
            <AdminHeader
                emoji="📅"
                title="행사 관리"
                desc="공동체의 소중한 일정들을 등록하고 관리하는 공간입니다."
                btnText={isEditing ? "목록으로" : "+ 새 행사 등록"}
                onClick={() => setIsEditing(!isEditing)}
            />

            <section className={style.content_body}>
                {isEditing ? (
                    <p>여기에 행사 작성 폼이 들어갑니다.</p>
                ) : (
                    <p>여기에 등록된 행사 카드 리스트가 들어갑니다.</p>
                )}
            </section>
        </main>
    )
}