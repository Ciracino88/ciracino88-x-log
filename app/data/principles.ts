import { PrincipleCategory } from "../types/principles"

export const principleData: PrincipleCategory[] = [
    {
        id: 1,
        category: "예배",
        subtitle: "최고의 준비, 최선의 태도",
        icon: "📖",
        items: [
            { tag: "#얼리버드", desc: "15~30분 전 도착, 기도로 준비" },
            { tag: "#말씀우선", desc: "설교 본문 미리 읽기 및 묵상" },
            { tag: "#환경점검", desc: "예배 자리를 깨끗하고 쾌적하게 유지" },
            { tag: "#예배우선", desc: "공동체의 예배를 사역보다 우선시하기" },
        ],
    },
    {
        id: 2,
        category: "환대",
        subtitle: "낯선 이를 가족으로",
        icon: "🤝",
        items: [
            { tag: "#첫인사", desc: "처음 온 지체 환영 및 안내 가이드" },
            { tag: "#안부전하기", desc: "장기 결석자 및 새가족을 위한 기도와 연락" },
            { tag: "#남겨진지체", desc: "예배 후 혼자 있는 청년 살피기" },
            { tag: "#상태체크", desc: "예배 전후 청년들의 표정과 마음 살피기" },
        ],
    },
    {
        id: 3,
        category: "소통",
        subtitle: "투명하고 건강한 연결",
        icon: "💬",
        items: [
            { tag: "#공식채널", desc: "불만은 뒤에서가 아닌 공식적인 자리에서" },
            { tag: "#팩트체크", desc: "추측하지 말고 직접 확인하기" },
            { tag: "#슬로우톡", desc: "감정이 올라올수록 말의 속도는 늦추고 존중하기" },
            { tag: "#실시간공유", desc: "단톡방 답장(리액션) 잘하기 및 늦지 않은 공유" },
        ],
    },
    {
        id: 4,
        category: "공동체",
        subtitle: "개인보다 공동체의 유익",
        icon: "🫂",
        items: [
            { tag: "#기도결정", desc: "기도 없이 결정하지 않고, 결정 후엔 하나 되기" },
            { tag: "#피드백", desc: "사역 후 임원 간 간단한 피드백 공유" },
            { tag: "#공동체우선", desc: "개인의 의견보다 전체의 유익과 흐름 보기" },
            { tag: "#책임공유", desc: "부재 시 미리 연락하고, 문제 발생 시 즉시 공유" },
        ],
    },
    {
        id: 5,
        category: "일상",
        subtitle: "삶으로 증명하는 사역",
        icon: "✨",
        items: [
            { tag: "#본보기", desc: "일상이 지체들에게 본이 되는 삶" },
            { tag: "#사람중심", desc: "어떤 문제보다 '사람'과 '관계'를 우선하기" },
        ],
    },
]