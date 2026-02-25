import style from "./card.module.css"

interface CardProps {
    title: string
    url: string
    img_url: string
    contents: string[]
}

export default function Card({ title, url, img_url, contents }: CardProps) {
    return (
        <a href={url} className={style.about_card}>
            <div className={style.about_card_top}>
                <h4 className={style.about_card_top_title}>{title}</h4>
                <span className={style.about_card_icon}>
                    <img src={img_url}></img>
                </span>
                <br /><br /><br /><br />
                {contents.map((content, i) => (
                    <span key={i}>
                        {content}
                        { i < contents.length - 1 && <br/> }
                    </span>
                ))}
            </div>
        </a>
    )
}