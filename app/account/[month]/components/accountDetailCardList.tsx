import { Transaction } from "@/app/types/transaction"
import style from "./accountDetailCardList.module.css"
import { useMemo, useState } from "react"

interface AcccountDetailCardListProps {
    items: Transaction.Type[]
    editMode: boolean
    selectedTransactions: Set<Transaction.Type>
    isIncome: string
    // zustand 사용시 간단하게 관리 가능... 추후 도입 고려
    setSelectedTransactions: React.Dispatch<React.SetStateAction<Set<Transaction.Type>>>;
    setIsIncome: React.Dispatch<React.SetStateAction<"none" | "income" | "outcome">>;
}

// 상위 뷰에서 useState 로 선언한 변수 -> 하위 뷰에 props 로 주입 -> 상위 뷰에서 값 변경 -> 하위 뷰 자동 업데이트
export default function AcccountDetailCardList({ items, editMode, selectedTransactions, isIncome, setSelectedTransactions, setIsIncome }: AcccountDetailCardListProps) {
    // useMemo => 복잡한 계산에 대해, 캐싱을 통해 불필요한 계산을 막아주는 훅.
    // useMemo 는 매 랜더링마다 뷰를 새로 그림. 단 상태 업데이트는 안함.
    // grouped: 같은 카테고리를 가진 것끼리 분류
    const grouped = useMemo(() => {
        const m = new Map<string, { id: string; categotyId: string; total: number; count: number; items: Transaction.Type[]; }>();

        items.forEach(item => {
            // item.categoryId 를 옵셔널 값으로 선언했음
            // has 함수 안에는 옵셔널 값이 들어갈 수 없음
            // item.categotyId 의 여부를 조건문에서 확정지어서 옵셔널이 아니게 만듬
            if (item.categotyId && item.categotyId !== "") {
                if (!m.has(item.categotyId)) {
                    m.set(item.categotyId, {
                        id: crypto.randomUUID(),
                        categotyId: item.categotyId,
                        total: 0,
                        count: 0,
                        items: []
                    });
                }

                const group = m.get(item.categotyId)!;
                const valueNum = Number(item.value.replace(/,/g, "")) || 0;
                group.total += valueNum;
                group.count += 1;
                group.items.push(item);
            }
        });

        return m;
    }, [items]);

    // 선택한 카테고리의 상세 내역을 보일지에 대한 트리거 상태
    const [showCategoryDetails, setShowCategoryDetails] = useState<Set<string>>(new Set());

    return (
        <div className={style.card_list}>
            {/* 카테고리 그룹 먼저 나열 */}
            {Array.from(grouped.values()).map(group => {
                const isShow = showCategoryDetails.has(group.categotyId);
                return (
                    <div key={group.categotyId}>
                        <div className={style.transaction_card}>
                            {editMode && (
                                <input
                                    type="checkbox"
                                    checked={isShow}
                                    onChange={(e) => {
                                        setShowCategoryDetails(prev => {
                                            const next = new Set(prev);
                                            if (e.target.checked) {
                                                next.add(group.categotyId);
                                            } else {
                                                next.delete(group.categotyId);
                                            }
                                            return next;
                                        })
                                    }}
                                    className={`${style.pk_checkbox} ${style.cg_checkbox}`}
                                />
                            )}
                            <div className={style.description}>{group.categotyId}</div>
                            <div className={`${style.amount} ${style.category_description}`}>{group.total.toLocaleString()} 원</div>
                        </div>
                        {isShow && group.items.length > 0 && (
                            <div>
                                {group.items.map(item => (
                                    <div key={item.id}>
                                        {item.description} - {item.value}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}

            {/* 카테고리가 없는 항목들 나열 */}
            {items.filter(item => !item.categotyId || item.categotyId === "").map(item => {
                const symbol = item.isIncome ? "+" : "-";
                return (
                    <div
                        key={item.id}
                        className={`${style.transaction_card} ${item.isIncome ? style.income : style.outcome}`}
                    >
                        {editMode && (
                            <input
                                type="checkbox"
                                checked={selectedTransactions.has(item)}
                                onChange={(e) => {
                                    const newSet = new Set(selectedTransactions);
                                    if (e.target.checked) {
                                        // selectedTransactions 가 비어있으면 isIncome 값을 설정해줘야함.
                                        if (selectedTransactions.size === 0) {
                                            if (item.isIncome) {
                                                setIsIncome("income");
                                            } else {
                                                setIsIncome("outcome");
                                            }
                                            newSet.add(item);
                                        } else {
                                            if (item.isIncome && isIncome === "income") {
                                                newSet.add(item);
                                            }

                                            else if (!item.isIncome && isIncome === "outcome") {
                                                newSet.add(item);
                                            }

                                            else {
                                                alert("올바르지 않은 값을 택했습니다.");
                                            }
                                        }
                                    } else {
                                        // 체크 해제한 값을 selectedTransactions 에서 제거했을 때 집합이 비게되면
                                        // isIncome = "none"
                                        newSet.delete(item);

                                        if (newSet.size === 0) {
                                            setIsIncome("none");
                                        }
                                    }
                                    setSelectedTransactions(newSet);
                                }}
                                className={style.pk_checkbox}
                            />
                        )}
                        <div className={style.description}>
                            {item.categotyId === "" ? item.description : item.categotyId}
                        </div>
                        <div className={style.amount}>
                            {symbol} {item.value} 원
                        </div>
                    </div>
                );
            })}
        </div>
    )
}