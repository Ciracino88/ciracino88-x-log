import style from "./bulletin.module.css"
import { prayers } from "@/app/data/prayers";
import FormField from "@/components/form/formField/page";


interface BulletinHeaderProps {
    date: string | null;
    issue_number: number | null;
    title: string | null;
    preacher: string | null;
    selected_prayer: string | null;
    onUpdateInfo: (key: keyof {
        date: string,
        issue_number: number,
        title: string,
        preacher: string,
        prayer: string
    }, value: any) => void;
}

export default function BulletinHeader({
    date,
    issue_number,
    title,
    preacher,
    selected_prayer,
    onUpdateInfo,
}: BulletinHeaderProps) {
    const options = prayers.map((p) => ({
        label: p.name,
        value: p.name
    }))
    return (
        <section className={style.section}>
            <h2>기본 정보</h2>

            <FormField
                label="날짜"
                type="date"
                value={date}
                onChange={(val) => onUpdateInfo("date", val)}
            />

            <FormField
                label="호수"
                type="number"
                value={issue_number}
                min={1}
                max={53}
                onChange={(val) => onUpdateInfo("issue_number", val)}
            />

            <FormField
                label="제목"
                type="text"
                value={title}
                onChange={(val) => onUpdateInfo("title", val)}
            />

            <FormField
                label="대표 기도"
                type="select"
                options={options}
                value={selected_prayer}
                onChange={(val) => onUpdateInfo("prayer", val)}
            />
        </section>
    )
}