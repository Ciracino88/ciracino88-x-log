export interface Verse {
    chapterNum: string;
    verseNum: string;
    verse: string;
}

export interface Chapter {
    chapterNum: string;
    verses: Verse[];
}

export interface BibleBook {
    korean: string;
    english: string;
    testament: "OT" | "NT"; // 구약, 신약
    categoryNumber: number;
    chapters: Chapter[];
}

export type BibleData = BibleBook[];