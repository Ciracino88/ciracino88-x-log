// 1. 타입을 만들 때는 기본값을 넣어주는게 불가능.
// 2. 그냥 타입의 필드를 갖는지 선언만 할 것.
// 3. 생성자는 팩토리 함수로 대체

export namespace Transaction {
    export interface Type {
        id: string;
        year: string;
        month: string;
        day: string;
        description: string;
        isIncome: boolean;
        value: string;
    }

    // factory 함수 : 생성자 역할
    export function create(
        partial: Omit<Type, "id"> & { id?: string }
    ): Type {
        return {
            id: partial.id ?? crypto.randomUUID(),
            year: partial.year,
            month: partial.month,
            day: partial.day,
            description: partial.description,
            isIncome: partial.isIncome,
            value: partial.value
        };
    }
}