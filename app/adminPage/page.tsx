import style from "./adminPage.module.css"
import Link from "next/link"
import Card from "@/components/card/card"
import { adminPageMenus } from "../data/adminPageMenus"
import Hero from "@/components/hero/page";

export default async function AdminPage() {
    return(
        <div className={style.container}>
            <main className={style.main}>
                <Hero
                    title="관리자 페이지"
                    desc="환영합니다, 이승호 회계님"
                />
                <section className={style.menus}>
                    <h2 className={style.menus_title}>메뉴</h2>
                    <div className={style.menus_grid}>
                        { adminPageMenus.map((menu, idx) => (
                            <Link key={idx} href={menu.link} className={style.menus_card_link}>
                                <Card
                                    emoji={menu.emoji}
                                    title={menu.title}
                                    desc={menu.desc}
                                />
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}