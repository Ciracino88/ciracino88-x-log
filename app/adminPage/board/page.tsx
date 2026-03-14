import Card from "@/components/card/card"
import style from "./borad.module.css"
import Hero from "@/components/hero/page"
import { adminPageMenus } from "@/app/data/adminPageMenus"
import Link from "next/link";

export default function Board() {
    const menus = adminPageMenus
        .filter(menu => menu.title === "사역 공지")
        .flatMap(menu => menu.items);

    return (
        <div className={style.container}>
            <main className={style.main}>
                <Hero
                    title="사역 공지"
                    desc="주보, 행사, 광고 등을 작성하고 관리하세요"
                />
                <section className={style.menus}>
                    <div className={style.menus_grid}>
                        {menus.map((menu, idx) => (
                            menu && (
                                <Link key={idx} href={menu.link} className={style.link}>
                                    <Card
                                        emoji={menu.emoji}
                                        title={menu.title}
                                        desc={menu.desc}
                                    />
                                </Link>
                            )
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}