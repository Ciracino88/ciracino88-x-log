import style from "./adminPage.module.css"
import Link from "next/link"

export default function AdminPage() {
    return(
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <h1 className={style.hero_title}>관리자 페이지</h1>
                        <p className={style.hero_desc}>환영합니다, 이승호 회계님</p>
                    </div>
                </section>
                <section className={style.menus}>
                    <h2 className={style.menus_title}>메뉴</h2>
                    <div className={style.menus_grid}>
                        <Link href="adminPage/weeklyEditPage" className={style.menus_card_link}>
                            <div className={style.menus_card}>
                                <div className={style.menus_icon}>📖</div>
                                <h3>주보 작성</h3>
                                <p>오늘 본문 말씀, 미리 살펴볼까요?</p>
                            </div>
                        </Link>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📖</div>
                            <h3>회계장부 작성</h3>
                            <p>오늘 본문 말씀, 미리 살펴볼까요?</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📖</div>
                            <h3>회칙 관리</h3>
                            <p>오늘 본문 말씀, 미리 살펴볼까요?</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📖</div>
                            <h3>맴버 승인</h3>
                            <p>오늘 본문 말씀, 미리 살펴볼까요?</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}