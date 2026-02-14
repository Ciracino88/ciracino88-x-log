"use client"

import { useState } from "react"
import style from "./accountDetailBody.module.css"
import CapsuleButton from "@/components/capsuleButton/capsuleButton"
import { Transaction } from "@/app/types/transaction"
import { Category } from "@/app/types/category"
import AcccountDetailCardList from "./accountDetailCardList"
import AccountDetailSavedCategories from "./accountDetailSavedCategories"

interface AccountDetailBodyProps {
    targets: Transaction.Type[]
}

export default function AccountDetailBody({ targets }: AccountDetailBodyProps) {
    const days = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
        "30", "31"
    ];

    // 대차대조표 작성 모드 활성화 트리거
    const [editMode, setEditMode] = useState(false);

    // 선택된 거래 배열
    const [selectedTransactions, setSelectedTransactions] = useState<Set<Transaction.Type>>(new Set());
    
    // 저장된 카테고리
    const [categories, setCategories] = useState<Category.Type[]>([]);
    
    const [newCategoryName, setNewCategoryName] = useState("");

    // 만드는 카테고리가 수입인지 지출인지 판단하는 트리거
    const [isIncome, setIsIncome] = useState<"income" | "outcome" | "none">("none");

    // 1. 수입/지출/전체 옵션 적용해서 필터링
    const filtering = () => {
        if (filter === "income") {
            return targets.filter(t => t.isIncome === true);
        }
        if (filter === "outcome") {
            return targets.filter(t => t.isIncome === false);
        }
        return targets; // "전체" 옵션 반환
    }

    // 2. 날짜별로 모아서 재분류
    const filtered_data = (date: string) => {
        const data = filtering();
        return data.filter(t => t.day === date);
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
            items.forEach(item => {
                if (selectedTransactions.has(item)) {
                    total += Number(item.value.replace(/,/g, "")) || 0;
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

        // 전체 데이터 -> 선택한 거래 배열 -> 카테고리 객체 생성 -> 기존 카테고리 배열에 추가
        // 1. 전체 거래 데이터 -> 선택한 거래 배열
        const selected = targets.filter(s =>
            selectedTransactions.has(s)
        );

        // 2. 새로운 카테고리 객체 생성
        const newCategory = Category.create({
            name: newCategoryName.trim(),
            isIncome: isIncome,
            transactions: selected
        });

        // 3. 기존 카테고리에 추가
        setCategories(prev => [...prev, newCategory]);

        // 전체 데이터에서 카테고리 네임을 반영
        targets.map(t =>
            selectedTransactions.has(t) ? t.categotyId = newCategory.name : ""
        )
        // 4. 입력값 초기화 & 선택 해제
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
                        // flex: flex-grow | flex-shrink | flex-basis
                        // flex-grow : 남는 공간이 있을 때, 얼마나 커질 수 있는가
                        // flex-shrink : 공간이 부족할 때, 얼마나 더 작아질 수 있는가
                        // flex-basis : 기본 크기
                        // 0 1 40% => 최소 40% 차치, 줄어들기만 가능
                        // 1 1 100% => 최대 100% 까지 늘어날 수 있으나 줄어들 수도 있음.
                        flex: editMode ? "0 1 50%" : "1 1 100%",
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
                                <AcccountDetailCardList
                                    items={items}
                                    editMode={editMode}
                                    selectedTransactions={selectedTransactions}
                                    isIncome={isIncome}
                                    setSelectedTransactions={setSelectedTransactions}
                                    setIsIncome={setIsIncome}
                                >
                                </AcccountDetailCardList>
                            </div>
                        )
                    })}
                </div>
                {/* 우측 영역: editMode 일 때만 활성화 */}
                <div
                    className={style.category_edit_panel}
                    style={{
                        flex: editMode ? "1 1 50%" : "0 0 0%",
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
                        <div className={`${style.selected_count}`}>
                            {selectedTransactions.size}건 선택됨 (합계: {getTotalSelectedAmount().toLocaleString()}원)
                        </div>
                    )}
                    
                    {/* 저장된 카테고리 목록 */}
                    <AccountDetailSavedCategories
                        filter={filter}
                        categories={categories}
                    >
                    </AccountDetailSavedCategories>
                </div>
            </div>
        </div>
    )
}