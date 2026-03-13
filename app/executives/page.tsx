"use client"

import style from "./executives.module.css"
import TeamCard from "./teamCard"
import PrincipleCard from "./principleCard"
import PrincipleDetail from "./principleDetail"
import { PrincipleCategory } from "../types/principles"
import { principleData } from "../data/principles"
import { useState } from "react"
import OrgChart from "./organization/orgChart"
import { orgData } from "../data/executiveOrganization"

export default function Executives() {
    const [selectedCategory, setSelectedCategory] = useState<PrincipleCategory | null>(null);
    const allMembers = orgData.flatMap(level => level.members);

    return (
        <div className={style.container}>
            <main className={style.main}>
                <section className={style.hero}>
                    <div className={style.hero_content}>
                        <h1 className={style.hero_title}>
                            나누리 청년부 임원진
                        </h1>
                        <p className={style.hero_subtitle}>
                            직책이 아니라 섬김으로 부름받은 이들
                        </p>
                    </div>
                </section>

                {/* 임원 조직도 */}
                <OrgChart/>

                {/* 임원 소개 카드 */}
                <section className={style.team}>
                    <h2 className={style.section_title}>우리를 소개합니다</h2>
                    <div className={style.team_grid}>
                        {allMembers.map(member => (
                            <div key={member.id} onClick={() => alert("상세 정보")}>
                                <TeamCard
                                    img={member.img}
                                    role={member.role}
                                    name={member.name}
                                    desc={member.manual.definition}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 임원 공통 원칙 */}
                <section className={style.principles}>
                    <div className={style.hero_content}>
                        <h2 className={style.section_title}>청년부 임원의 공통 원칙</h2>
                        <div className={style.principles_grid}>
                            {principleData.map((item, idx) => (
                                <PrincipleCard key={idx} data={item} onClick={() => setSelectedCategory(item)}/>
                            ))}
                        </div>

                        {/* 상세 내용 표기 모달 */}
                        {selectedCategory && (
                            <PrincipleDetail
                                data={selectedCategory}
                                onClose={() => setSelectedCategory(null)}
                            />
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}