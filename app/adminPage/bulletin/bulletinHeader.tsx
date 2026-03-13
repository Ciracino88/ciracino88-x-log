import style from "./bulletin.module.css"
import Calendar from "@/components/calendar/page";
import AutocompleteField from "@/components/autocompleteField/page";
import { prayer } from "@/app/data/prayers";

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
    return (
        <section className={style.section}>
            <div className={style.card}>
                <div className={style.field}>
                    <label>날짜</label>
                    <Calendar
                        value={date ? new Date(date) : null} 
                        onChange={(newDate) => {
                            const dateString = newDate ? newDate.toISOString().split('T')[0] : "";
                            onUpdateInfo("date", dateString);
                        }}
                    />
                </div>
                <div className={style.field}>
                    <label>호수</label>
                    <input
                        type="number"
                        className={style.input}
                        value={issue_number === 0 ? "" : (issue_number ?? "")}
                        onChange={(e) => {
                            const val = e.target.value;

                            // 값을 다 지우면, null 이나 "" 를 전달
                            if (val === "") {
                                onUpdateInfo("issue_number", null);
                                return;
                            }

                            onUpdateInfo("issue_number", parseInt(val, 10));
                        }}
                        placeholder="1"
                        max={53}
                        min={1}
                    />
                </div>
                <div className={style.field}>
                    <label>제목</label>
                    <input
                        type="text"
                        className={style.input}
                        value={title ?? ""}
                        onChange={(e) => onUpdateInfo("title", e.target.value)}
                        placeholder="제목을 입력해주세요"
                    />
                </div>
                <div className={style.field}>
                    <label>설교자</label>
                    <input
                        type="text"
                        className={style.input}
                        value={preacher ?? ""}
                        onChange={(e) => onUpdateInfo("preacher", e.target.value)}
                        placeholder="이름을 입력해주세요"
                    />
                </div>
                <div className={style.field}>
                    <label>대표기도</label>
                    <AutocompleteField
                        options={prayer}
                        value={selected_prayer}
                        onChange={
                            (_, newValue) => onUpdateInfo("prayer", newValue)
                        }
                    />
                </div>
            </div>
        </section>
    )
}