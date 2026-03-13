// components/OrgChart.tsx
"use client";

import React, { useEffect, useState } from 'react';
import style from './organization.module.css';
import { orgData } from '../../data/executiveOrganization';

export default function OrgChart() {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        // DOM 렌더링 후 좌표 계산을 위해 상태 변경
        setIsRendered(true);
    }, []);

    return (
        <section className={style.org_section}>
            <h2 className={style.section_title}>조직도</h2>
            <div className={style.org_container}>
                {/* 계층별 카드 영역 */}
                {orgData.map((group) => (
                    <div key={group.level} className={style.org_row}>
                        {group.members.map((member) => (
                            <div
                                key={member.id}
                                id={member.id}
                                className={style.role_card}
                            >
                                <span className={style.role_name}>{member.role}</span>
                                <span className={style.member_name}>{member.name}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}