"use client"

import { PrincipleCategory } from "../types/principles";
import style from "./executives.module.css"

interface PrincipleDetailProps {
    data: PrincipleCategory;
    onClose: () => void;
}

export default function PrincipleDetail({ data, onClose }: PrincipleDetailProps) {
    return (
        <div className={style.modal_overlay} onClick={onClose}>
            <div className={style.modal_content} onClick={(e) => e.stopPropagation()}>
                {/* 헤더 영역 */}
                <div className={style.modal_header}>
                    <h2 className={style.modal_title}>
                        {data.category} {data.icon}
                    </h2>
                    <button className={style.close_button} onClick={onClose}>&times;</button>
                </div>

                {/* 리스트 영역 */}
                <div className={style.modal_body}>
                    <div className={style.item_list}>
                        {data.items.map((item, index) => (
                            <div key={index} className={style.item_group}>
                                {/* 번호와 태그 라인 */}
                                <div className={style.item_header}>
                                    <div className={style.item_index}>{index + 1}</div>
                                    <span className={style.item_tag}>{item.tag}</span>
                                </div>

                                {/* 들여쓰기된 내용 */}
                                <div className={style.item_content}>
                                    <p className={style.item_desc}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}