import { PrincipleCategory } from "../types/principles";
import style from "./executives.module.css"

interface PrincipleCardProps {
    data: PrincipleCategory;
    onClick: () => void // 클릭 이벤트: 상세 내용을 보여줌
}

export default function PrincipleCard({data, onClick}: PrincipleCardProps) {
    return(
        <div className={style.principles_card} onClick={onClick}>
            <div className={style.principles_icon}>{data.icon}</div>
            <h3>{data.category}</h3>
            <p>{data.subtitle}</p>
        </div>
    )
}