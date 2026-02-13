"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import AccountDetailHeader from './components/accountDetailHeader';
import AccountDetailBody from './components/accountDetailBody';
import { Transaction } from '@/app/types/transaction';


export default function AccountDetail() {

    const { month } = useParams();
    const [transactions, setTransactions] = useState<Transaction.Type[]>([]);

    const filtered = () => {
        return transactions.filter(t => t.month === month)
    }
    useEffect(() => {
        fetch("/거래내역조회20260209.txt")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("파일 로드 실패");
                }
                return response.arrayBuffer();
            })
            .then((buffer) => {
                // 한글 깨짐 방지 디코딩
                const decoder = new TextDecoder("euc-kr");
                const text = decoder.decode(buffer)

                // 줄바꿈 단위로 거래 내역 파싱
                const lines = text.split(/\r?\n/);

                // 거래 객체 생성
                const trs = lines.map(lines => {
                    const cols = lines.split("|").map(item => item.trim());

                    const dt = cols[1].split(" ")[0].split(".");
                    const year = dt[0];
                    const month = dt[1];
                    const day = dt[2];
                    const description = cols[3];
                    const isIncome = cols[4] === "0" ? true : false;
                    const value = isIncome ? cols[5] : cols[4];

                    return Transaction.create({
                        year,
                        month,
                        day,
                        description: description,
                        isIncome: isIncome,
                        value: value
                    });
                });

                setTransactions(trs);
            })
    }, []);

    return (
        <div className="account-detail-container">
            <AccountDetailHeader>{month}월 거래 내역</AccountDetailHeader>
            <AccountDetailBody
                targets={filtered()}
            >
            </AccountDetailBody>
        </div>
    )
}

// 회계장부 작성할 때 과정 정리
// 1. 일단 날짜순으로 수입 지출을 다 작성
// 1.1. 사람 이름으로 적힌 것들은 헌금으로 통합해서 계산함
// 2. 더하기 빼기
// 3. 카테고리별로 재분류해서 더하기
// 4. 날짜순 합산이랑 카테고리 합산이랑 맞으면 패스

