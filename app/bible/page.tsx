"use client"

import { useState, useEffect } from 'react';
import { bookNameToAbbr } from '../types/bibleBooks';

type BibleData = Record<string, string>;

export default function BiblePage() {
    const [bible, setBible] = useState<BibleData | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedBook, setSelectedBook] = useState<string>("창세기");
    const [chapter, setChapter] = useState<string>("1");
    const [verse, setVerse] = useState<string>("1");

    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/bible.json")
            .then(res => {
                if (!res.ok) throw new Error("JSON 로드 실패");
                return res.json();
            })
            .then(data => {
                setBible(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        if (!bible) {
            setError("성경 데이터를 불러올 수 없습니다.");
            return;
        }

        const abbr = bookNameToAbbr[selectedBook];
        
        if (!abbr) {
            setError("해당 책 이름을 인식할 수 없습니다.");
            return;
        }

        const key = `${abbr}${chapter}:${verse}`;
        const text = bible[key];

        if (text) {
            setResult(`${selectedBook} ${chapter}:${verse}\n${text.trim()}`);
            setError(null);
        } else {
            setResult(null);
            setError("해당 구절을 찾을 수 없습니다.");
        }
    };

    if (loading) {
        <div>성경을 불러오는 중...</div>
    }

    return(
        <div>
            <h1>성경 구절 검색</h1>
            <div>
                <label>책</label>
                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                >
                    {Object.keys(bookNameToAbbr).map((book) => (
                        <option key={book} value={book}>
                            {book}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>장</label>
                <input
                    type='number'
                    min="1"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="1"
                />
            </div>
            <div>
                <label>절</label>
                <input
                    type='number'
                    min="1"
                    value={verse}
                    onChange={(e) => setVerse(e.target.value)}
                    placeholder="1"
                />
            </div>
            <button onClick={handleSearch}>구절 확인</button>
            {error && <p>{error}</p>}
            {result && (
                <div>
                    <p>{result}</p>
                </div>
            )}
        </div>
    )
}