import { Category } from "@/app/types/category";
import style from "./accountDetailSavedCategories.module.css"

interface accountDetailSavedCategoriesProps {
    filter: "all" | "income" | "outcome"
    categories: Category.Type[]
}

export default function accountDetailSavedCategories({ filter, categories }: accountDetailSavedCategoriesProps) {
    const incomeCategories = categories.filter(cat => cat.isIncome === "income");
    const outcomeCategories = categories.filter(cat => cat.isIncome === "outcome");

    const totalIncome = incomeCategories.reduce(
        (sum, cat) => sum + Category.getAmount(cat), 0
    );

    const totalOutcome = outcomeCategories.reduce(
        (sum, cat) => sum + Category.getAmount(cat), 0
    );
    
    return (
        <div>
            {filter === "all" && (
                <div className={style.saved_categories_container}>
                    {/* 수입 섹션 */}
                    <div className={style.category_section}>
                        <h3 className={style.section_title}>수입</h3>
                        <div className={style.saved_categories}>
                            {categories
                                .filter(cat => cat.isIncome === "income")
                                .map(item => (
                                    <div key={item.id} className={style.category_tag}>
                                        <span className={style.category_name}>{item.name}</span>
                                        <span className={style.category_amount}>
                                            +{Category.getAmount(item).toLocaleString()} 원
                                        </span>
                                    </div>
                                ))}
                            {categories.filter(cat => cat.isIncome === "income") && (
                                <div className={style.total_row}>
                                    <span className={style.total_label}>합계</span>
                                    <span className={`${style.total_amount} ${style.income}`}>
                                        +{totalIncome.toLocaleString()} 원
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 지출 섹션 */}
                    <div className={style.category_section}>
                        <h3 className={style.section_title}>지출</h3>
                        <div className={style.saved_categories}>
                            {categories
                                .filter(cat => cat.isIncome === "outcome")
                                .map(item => (
                                    <div key={item.id} className={style.category_tag}>
                                        <span className={style.category_name}>{item.name}</span>
                                        <span className={style.category_amount}>
                                            -{Category.getAmount(item).toLocaleString()} 원
                                        </span>
                                    </div>
                                ))}
                            {categories.filter(cat => cat.isIncome === "outcome") && (
                                <div className={style.total_row}>
                                    <span className={style.total_label}>합계</span>
                                    <span className={`${style.total_amount} ${style.income}`}>
                                        -{totalOutcome.toLocaleString()} 원
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {filter == "income" && (
                <div>
                    {categories
                        .filter(cat => cat.isIncome === "income")
                        .map(item => (
                            <div key={item.id} className={style.category_tag}>
                                <span className={style.category_name}>{item.name}</span>
                                <span className={style.category_amount}>
                                    {Category.getAmount(item).toLocaleString()} 원 ({item.transactions.length}건)
                                </span>
                            </div>
                        ))
                    }
                </div>
            )}
            {filter == "outcome" && (
                <div>
                    {categories
                        .filter(cat => cat.isIncome === "outcome")
                        .map(item => (
                            <div key={item.id} className={style.category_tag}>
                                <span className={style.category_name}>{item.name}</span>
                                <span className={style.category_amount}>
                                    {Category.getAmount(item).toLocaleString()} 원 ({item.transactions.length}건)
                                </span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}