import style from "./adminHeader.module.css"

interface AdminHeaderProps {
    emoji: string;
    title: string;
    desc: string;

    // 옵셔널 값
    btnText?: string;
    onClick?: () => void;
}

export default function AdminHeader({
    emoji, title, desc, btnText, onClick
}: AdminHeaderProps) {
    return (
        <header className={style.header}>
            <div className={style.wrapper}>
                <div className={style.text_group}>
                    <h1>
                        <span>{emoji}</span>{title}
                    </h1>
                    <p>{desc}</p>
                </div>

                {(btnText && onClick) && (
                    <button className={style.action_btn} onClick={onClick}>{btnText}</button>
                )}
            </div>
        </header>
    )
}