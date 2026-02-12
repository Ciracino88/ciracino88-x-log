"use client"

import { useState } from "react"
import style from "./accountDetailBody.module.css"
import CapsuleButton from "@/components/capsuleButton/capsuleButton"

interface AccountDetailBodyProps {
    targets: string[][];
}
export default function AccountDetailBody({ targets }: AccountDetailBodyProps) {
    const days = [
        "01","02","03","04","05","06","07","08","09",
        "10","11","12","13","14","15","16","17","18","19",
        "20","21","22","23","24","25","26","27","28","29",
        "30","31"
    ];

    // 1. 수입/지출/전체 옵션 적용해서 필터링
    const filtering = () => {
        if (filter === "income") {
            return targets.filter(t => t[4] === "0");
        }
        if (filter === "outcome") {
            return targets.filter(t => t[5] === "0");
        }
        return targets; // "전체" 옵션 반환
    }

    // 2. 날짜별로 모아서 재분류
    const filtered_data = (date: string) => {
        const filtered = filtering();
        return filtered.filter(t => t[1].split(" ")[0].split(".")[2] === date);
    }

    // 콤보박스 옵션 (전체/수입/지출, default=전체)
    const [filter, setFilter] = useState<"all" | "income" | "outcome">("all");
    // 카테고리 추가 버튼 누르면 활성, 애니메이션 트리거
    const [shakeTrigger, setShakeTrigger] = useState(false);

    const handleAddCategory = () => {
        setShakeTrigger(prev => !prev)
    }

    return (
        <div className={style.account_detail_body_container}>
            <div className={style.account_detail_body_optionBar}>
                <div>
                    <select name="order" defaultValue="date">
                        <option value="date">날짜순</option>
                    </select>
                    <select name="filter" value={filter} onChange={(e) => setFilter(e.target.value as "all" | "income" | "outcome")}>
                        <option value="all">전체</option>
                        <option value="income">수입</option>
                        <option value="outcome">지출</option>
                    </select>
                </div>
                <CapsuleButton variant="primary" size="md" onClick={() => alert('대차대조표 작성 기능 준비중')}>대차대조표 작성</CapsuleButton>
            </div>
            <div className={style.account_detail_body_rows_container}>
                <div className={style.transaction_container}>
                    {days.map((day) => {
                        const items = filtered_data(day);
                        if (items.length === 0) return null;

                        return(
                            <div key={day} className={style.date_card}>
                                <div className={style.date_title}>
                                    {day}일 거래 내역
                                </div>
                                <div className={style.card_list}>
                                    {items.map((fd, j) => {
                                        const isIncome = fd[4] === "0";
                                        const symbol = isIncome ? "+" : "-";

                                        return(
                                            <div
                                                key={j}
                                                className={`${style.transaction_card} ${isIncome ? style.income : style.outcome}`}
                                            >
                                                <div className={style.description}>{fd[3]}</div>
                                                <div className={style.amount}>
                                                    {symbol} {fd[4] === "0" ? fd[5] : fd[4]} 원
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="divider"></div>
                <div className={style.account_detail_body_row}>
                    <div
                        className={style.account_detail_category}
                        style={shakeTrigger ? { border: "2px solid #ec5353" } : {}}
                        onClick={handleAddCategory}
                        role="button"
                        tabIndex={0}
                    >
                        {shakeTrigger ? "카테고리 생성 중..." : "+ 카테고리 추가"}
                    </div>
                </div>
            </div>
        </div>
    )
}

// 1. 날짜별 데이터를 돈다.
// 2. 수입, 지출 데이터 구분 (필터링)
// 3. 필터링된 데이터를 날짜순으로 정렬

{/* <div className={style.account_detail_body_row}>
                    {days.map((day, i) => (
                        <ul key={i}>
                            <span className={style.account_detail_body_row_item_title}>{filtered_data(day).length > 0 ? `${day}일 거래 내역` : ""}</span>
                            {filtered_data(day).map((fd, j) => (
                                <li
                                    key={j}
                                    className={fd[4] === "0" ? style.account_detail_body_row_item_income : style.account_detail_body_row_item_outcome}
                                >
                                    <span className={`account-detail-text ${shakeTrigger ? "shake-text" : ""}`}>{fd[3]} - {fd[4] === "0" ? fd[5] : fd[4]}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div> */}