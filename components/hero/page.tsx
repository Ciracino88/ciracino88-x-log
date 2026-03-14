import style from "./hero.module.css"

interface HeroProps {
    title: string; // 관리자 페이지
    desc: string; // 환영합니다, 이승호 회계님

    // 옵셔널 값
    background_c?: string;
    text_c?: string;
}

export default function Hero({
    title, desc,
    background_c = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    text_c = "white",
}: HeroProps) {
    return (
        <header
            className={style.hero}
            style={{
                background: background_c,
                color: text_c
            }}
        >
            <div className={style.content}>
                <h1 className={style.title}>{title}</h1>
                <p className={style.desc}>{desc}</p>
            </div>
        </header>
    )
}