export const adminPageMenus = [
    {
        emoji: "✍️",
        title: "사역 공지",
        desc: "주보, 행사, 광고 작성 및 관리",
        link: "adminPage/board",
        items: [
            {
                emoji: "✍️",
                title: "주보",
                desc: "주보 작성 및 관리",
                link: "board/bulletin",
            },
            {
                emoji: "✍️",
                title: "행사",
                desc: "행사 작성 및 관리",
                link: "board/event",
            },
            {
                emoji: "✍️",
                title: "광고",
                desc: "광고 작성 및 관리",
                link: "board/notice",
            },
        ]
    },
    {
        emoji: "👥",
        title: "맴버 관리",
        desc: "나누리 맴버 승인 및 인적사항 관리",
        link: "#"
    },
    {
        emoji: "📑",
        title: "행정 및 재정",
        desc: "회의록 아카이빙 및 회계 관리",
        link: "#"
    },
    {
        emoji: "📮",
        title: "소통 창구",
        desc: "설문조사, Q&A",
        link: "#"
    },
]