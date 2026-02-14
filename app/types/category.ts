import { Transaction } from "./transaction";

export namespace Category {
    export interface Type {
        id: string;
        name: string;
        isIncome: string; // none | income | outcome
        transactions: Transaction.Type[];
    }

    // factory 함수 : 생성자 역할
    export function create(
        partial: Omit<Type, "id"> & { id?: string }
    ): Type {
        return {
            id: partial.id ?? crypto.randomUUID(),
            name: partial.name,
            isIncome: partial.isIncome,
            transactions: partial.transactions
        };
    }

    export function getAmount(category: Type): number {
        return category.transactions.reduce((sum, tx) => {
            // value = "1,000" -> "1000"
            const cleaned = tx.value.replace(/[^0-9.-]/g, '').replace(/,/g, '');

            const num = Number(cleaned) || 0;
            return sum + num;
        }, 0);
    }
}