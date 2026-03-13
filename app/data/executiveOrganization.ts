import { OrgLevel } from "../types/organization";

export const orgData: OrgLevel[] = [
  {
    level: 1,
    members: [{
      id: "pastor_1", role: "담임목사", name: "김만수", img: "/images/logo.jpg",
      manual: {
        definition: "텍스트 미정",
        mission: [],
        focus: [],
        routine: []
      }
    }]
  },
  {
    level: 2,
    members: [{
      id: "vice_pastor_1", role: "교감", name: "김남중", img: "/images/logo.jpg",
      manual: {
        definition: "텍스트 미정",
        mission: [],
        focus: [],
        routine: []
      }
    }]
  },
  {
    level: 3,
    members: [
      {
        id: "staff", role: "담당사역자", name: "이충성", img: "/images/logo.jpg",
        manual: {
          definition: "텍스트 미정",
          mission: [],
          focus: [],
          routine: []
        }
      },
      {
        id: "elder", role: "부장", name: "박영훈", img: "/images/logo.jpg",
        manual: {
          definition: "텍스트 미정",
          mission: [],
          focus: [],
          routine: []
        }
      },
    ]
  },
  {
    level: 4,
    members: [
      {
        id: "president_1", role: "회장", name: "김진규", img: "/images/logo.jpg",
        manual: {
          definition: "청년부 페이스메이커",
          mission: [],
          focus: [],
          routine: []
        }
      },
    ]
  },
  {
    level: 5,
    members: [
      {
        id: "vp_1", role: "부회장", name: "유수민", img: "/images/logo.jpg",
        manual: {
          definition: "청년부의 행동대장",
          mission: [],
          focus: [],
          routine: []
        }
      },
      {
        id: "secy_gen_1", role: "총무", name: "김민진", img: "/images/logo.jpg",
        manual: {
          definition: "사역의 허리, 청년부 일정과 행사를 총괄한다!",
          mission: [],
          focus: [],
          routine: []
        }
      },
      {
        id: "worship_leader_1", role: "찬양팀 리더", name: "변형섭", img: "/images/logo.jpg",
        manual: {
          definition: "텍스트 미정",
          mission: [],
          focus: [],
          routine: []
        }
      },
    ]
  },
  {
    level: 6,
    members: [
      {
        id: "scribe_1", role: "서기", name: "조은혜", img: "/images/logo.jpg",
        manual: {
          definition: "사역의 결정과 진행 내용을 정확히 기록한다!",
          mission: [],
          focus: [],
          routine: []
        }
      },
      {
        id: "treasurer_1", role: "회계", name: "이승호", img: "/images/logo.jpg",
        manual: {
          definition: "공동체의 신뢰와 재정의 흐름을 관리한다!",
          mission: [],
          focus: [],
          routine: []
        }
      },
    ]
  },
]