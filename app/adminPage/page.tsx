import style from "./adminPage.module.css"
import Link from "next/link"

export default async function AdminPage() {
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
                        <Link href="adminPage/bulletin" className={style.menus_card_link}>
                            <div className={style.menus_card}>
                                <div className={style.menus_icon}>📖</div>
                                <h3>주보</h3>
                                <p>주보 작성 페이지입니다</p>
                            </div>
                        </Link>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📢</div>
                            <h3>광고</h3>
                            <p>광고 작성 페이지입니다</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>📊</div>
                            <h3>투표 관리</h3>
                            <p>투표 관리 페이지</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>💰</div>
                            <h3>회계장부 작성</h3>
                            <p>comming soon</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>⚖️</div>
                            <h3>회칙 관리</h3>
                            <p>나누리 회칙을 관리하는 페이지입니다</p>
                        </div>
                        <div className={style.menus_card}>
                            <div className={style.menus_icon}>✔️</div>
                            <h3>맴버 승인</h3>
                            <p>로그인 유저를 나누리 회원으로 승격시키세요</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}