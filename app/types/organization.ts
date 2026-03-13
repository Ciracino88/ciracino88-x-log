// 회장, 부회장, 담임 목사 같이 하나의 직책 객체
export interface OrgMember {
  id: string; // 선 연결을 위한 고유 ID
  role: string;
  name: string;
  img: string;
  manual: Manual;
}

// (담당 사역자, 부장) 같이 다수의 직책을 묶는 하나의 행 객체
export interface OrgLevel {
  level: number;
  members: OrgMember[];
}

export interface Manual {
  definition: string; // 직책을 요약하는 한 줄
  mission: string[]; // 직책의 주요 임무
  focus: string[]; // 직책이 집중할 부분
  routine: string[]; // 직책이 실질적으로 행하는 것들
}