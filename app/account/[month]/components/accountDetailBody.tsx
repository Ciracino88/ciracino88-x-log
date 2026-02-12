"use client"

import { useState } from "react"
import style from "./accountDetailBody.module.css"
import CapsuleButton from "@/components/capsuleButton/capsuleButton"

interface AccountDetailBodyProps {
    targets: string[][];
}
export default function AccountDetailBody({ targets }: AccountDetailBodyProps) {
    const days = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
        "30", "31"
    ];

    const [editMode, setEditMode] = useState(false);
    // 선택된 거래의 고유 키: day + j 로 임의 설정. 추후 확장시 리팩토링 필요
    const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
    // 저장된 카테고리
    const [categories, setCategories] = useState<Array<{ name: string; amount: number; count: number }>>([]);
    const [newCategoryName, setNewCategoryName] = useState("");

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

    // 대차대조표 작성 버튼 이벤트 트리거
    const toggleEditMode = () => {
        setEditMode(prev => !prev);
    }

    // 선택한 거래항목의 금액 합계를 반환
    const getTotalSelectedAmount = () => {
        let total = 0;

        days.forEach((day) => {
            const items = filtered_data(day);
            items.forEach((fd, j) => {
                // 1. 고유키 설정
                const primaryKey = `${day}-${j}`;

                // 2. 선택한 거래항목 중에 해당 항목이 있다면
                if (selectedTransactions.has(primaryKey)) {
                    const isIncome = fd[4] === "0";
                    const amountStr = isIncome ? fd[5] : fd[4];
                    total += Number(amountStr.replace(/,/g, "")) || 0;
                }
            });
        });

        return total;
    }

    // 카테고리 추가 이벤트 로직
    const handleAddCategory = () => {
        if (!newCategoryName.trim() || selectedTransactions.size === 0) {
            return;
        }

        // 새 카테고리 추가
        setCategories((prev) => [
            ...prev,
            { name: newCategoryName.trim(), amount: getTotalSelectedAmount(), count: selectedTransactions.size }
        ]);

        // 입력값 초기화 & 선택 해제
        setNewCategoryName("");
        setSelectedTransactions(new Set());
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
                <CapsuleButton
                    variant="primary"
                    size="md"
                    onClick={toggleEditMode}
                >
                    {editMode ? "편집 완료" : "대차대조표 작성"}
                </CapsuleButton>
            </div>
            <div className={style.account_detail_body_rows_container}>
                {/* 좌측 영역 : 거래 내역 표시 */}
                <div
                    className={style.transaction_container}
                    style={{
                        flex: editMode ? "0 1 40%" : "1 1 100%",
                        transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                >
                    {days.map((day) => {
                        const items = filtered_data(day);
                        if (items.length === 0) return null;

                        return (
                            <div key={day} className={style.date_card}>
                                <div className={style.date_title}>
                                    {day}일 거래 내역
                                </div>
                                <div className={style.card_list}>
                                    {items.map((fd, j) => {
                                        const isIncome = fd[4] === "0";
                                        const symbol = isIncome ? "+" : "-";
                                        const primaryKey = `${day}-${j}`; // 임의의 고유키 설정

                                        return (
                                            <div
                                                key={primaryKey}
                                                className={`${style.transaction_card} ${isIncome ? style.income : style.outcome}`}
                                            >
                                                {editMode && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTransactions.has(primaryKey)}
                                                        onChange={(e) => {
                                                            const newSet = new Set(selectedTransactions);
                                                            if (e.target.checked) {
                                                                newSet.add(primaryKey);
                                                            } else {
                                                                newSet.delete(primaryKey);
                                                            }
                                                            setSelectedTransactions(newSet);
                                                        }}
                                                        className={style.pk_checkbox}
                                                    />
                                                )}
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
                {/* 우측 영역: editMode 일 때만 활성화 */}
                <div
                    className={style.category_edit_panel}
                    style={{
                        flex: editMode ? "1 1 60%" : "0 0 0%",
                        opacity: editMode ? 1 : 0,
                        visibility: editMode ? "visible" : "hidden",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                >
                    <h3>카테고리 편집</h3>
                    <div className={style.category_input_area}>
                        <input
                            type="text"
                            placeholder="새 카테고리 입력"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className={style.category_input}
                        />
                        <CapsuleButton
                            variant="primary"
                            size="sm"
                            onClick={handleAddCategory}
                            disabled={!newCategoryName.trim() || selectedTransactions.size === 0}
                        >
                            추가
                        </CapsuleButton>
                    </div>
                    {/* 선택한 항목 수 표시 */}
                    {selectedTransactions.size > 0 && (
                        <div className={style.selected_count}>
                            {selectedTransactions.size}건 선택됨 (합계: {getTotalSelectedAmount().toLocaleString()}원)
                        </div>
                    )}
                    
                    {/* 저장된 카테고리 목록 */}
                    <div className={style.saved_categories}>
                        {categories.map((cat, idx) => (
                            <div key={idx} className={style.category_tag}>
                                <span className={style.category_name}>{cat.name}</span>
                                <span className={style.category_amount}>
                                    {cat.amount.toLocaleString()}원 ({cat.count}건)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}