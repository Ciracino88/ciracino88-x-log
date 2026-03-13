import style from "./executives.module.css"

interface TeamCardProps {
    img: string,
    name: string,
    role: string,
    desc: string
}

export default function TeamCard({img, name, role, desc} : TeamCardProps) {
    return (
        <div className={style.team_card}>
            <div className={style.team_photo_wrapper}>
                <img src={img} alt={name} className={style.team_photo} />
            </div>
            <h3 className={style.team_name}>{name}</h3>
            <p className={style.team_role}>{role}</p>
            <p className={style.team_desc}>{desc}</p>
        </div>
    )
}