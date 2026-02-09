"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'

type stringArr = string[]

export default function AccountDetail() {
    const days = [
        "01","02","03","04","05","06","07","08","09",
        "10","11","12","13","14","15","16","17","18","19",
        "20","21","22","23","24","25","26","27","28","29",
        "30","31"
    ];
    const { month } = useParams();
    const [targets, setTargets] = useState<stringArr[]>([]);

    const toInt = (data: String) => {
        return parseInt(data.replace(/,/g, ''));
    }

    const income_arr = targets.filter(t => t[4] === "0");
    const outcome_arr = targets.filter(t => t[5] === "0");

    const income = () => {
        var result = 0;
        for (let i = 0; i < income_arr.length; i++) {
            result += toInt(income_arr[i][5])
        }
        return result;
    }

    const outcome = () => {
        var result = 0;
        for (let i = 0; i < outcome_arr.length; i++) {
            result += toInt(outcome_arr[i][4])
        }
        return result;
    }

    const filtered_days = (date: string) => {
        return targets.filter(t => t[1].split(" ")[0].split(".")[2] === date)
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
            const decoder = new TextDecoder("euc-kr");
            const text = decoder.decode(buffer)

            const allLines = text.split(/\r?\n/);

            const allWords = allLines.map((word) => {
                return word.split("|").map((item) => item.trim());
            });

            const allTarget = allWords.filter(t => t[1].split(" ")[0].split(".")[1] === month);

            setTargets(allTarget);
        })
    }, []);

    return(
        <div className="account-detail-container">
            <h4>{month}월 거래 내역</h4>
            <div>
                {days.map((day, i) => (
                    <ul key={i}>
                        {filtered_days(day).length > 0 ? `${day}일 거래 내역` : ""}
                        {filtered_days(day).map((fd, j) => (
                            <li key={j} className={fd[4] === "0" ? "income-text" : "outcome-text"}>
                                {fd[3]} - {fd[4] === "0" ? fd[5] : fd[4]}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}

{/* <div className='account-detail-card-box-container'>
                    <h4>수입 {income().toLocaleString()} 원</h4>
                    <div className="account-detail-card-box">
                        {targets.filter(filtered => filtered[4] === "0").map((t, i) => (
                            <div key={i} className='account-detail-card'>
                                <p>{t[1].split(" ")[0]}</p>
                                <p>{t[3]}</p>
                                <p>+ {t[5]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='account-detail-card-box-container'>
                    <h4>지출 {outcome().toLocaleString()} 원</h4>
                    <div className="account-detail-card-box">
                        {targets.filter(filtered => filtered[5] === "0").map((t, i) => (
                            <div key={i} className='account-detail-card'>
                                <p>{t[1].split(" ")[0]}</p>
                                <p>{t[3]}</p>
                                <p>- {t[4]}</p>
                            </div>
                        ))}
                    </div>
                </div> */}

// 회계장부 작성할 때 과정 정리
// 1. 일단 날짜순으로 수입 지출을 다 작성
// 1.1. 사람 이름으로 적힌 것들은 헌금으로 통합해서 계산함
// 2. 더하기 빼기
// 3. 카테고리별로 재분류해서 더하기
// 4. 날짜순 합산이랑 카테고리 합산이랑 맞으면 패스

