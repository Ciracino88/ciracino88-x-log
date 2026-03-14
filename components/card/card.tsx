import style from "./card.module.css"

interface CardProps {
    emoji: string; //🫡
    title: string; // 임원진
    desc: string; // 주님의 사역에 헌신하는 동역자들

    // 입력 시 반영되는 옵션값
    border_c?: string; // #e2e8f0
    background_c?: string; // #f8fafc
    title_c?: string; // #2d3748
    desc_c?: string; // #4a5568
    border_hc?: string; // #667eea
}

export default function Card({
    emoji, title, desc,
    border_c = "#e2e8f0", 
    background_c = "#f8fafc", 
    title_c = "#2d3748",
    desc_c = "#4a5568",
    border_hc = "#667eea"
}: CardProps) {
    return (
        <div
            className={style.card}
            style={{
                background: background_c,
                border: `1px solid ${border_c}`,
                ["--hover-border-color" as any]: border_hc,
            } as React.CSSProperties}
        >
            <div className={style.emoji}>{emoji}</div>
            <h3 style={{ color: title_c }}>{title}</h3>
            <p style={{ color: desc_c }}>{desc}</p>
        </div>
    )
}