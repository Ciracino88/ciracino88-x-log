// types/bulletinSchema.ts
import { z } from "zod";

export const BulletinSchema = z.object({
  date: z.string().min(1, "날짜를 선택해주세요."),
  // 만약 input에서 string으로 들어올 가능성이 있다면 coerce(강제변환) 사용 추천
  issue_number: z.coerce.number().int().positive("호수는 양수여야 합니다."),
  title: z.string().min(1, "제목을 입력해주세요."),
  preacher: z.string().min(1, "설교자를 입력해주세요."),
  prayer: z.string().min(1, "대표기도자를 선택해주세요."),
  book: z.string().min(1, "성경 책을 선택해주세요."),
  chapter: z.coerce.number().positive("장은 숫자여야 합니다."),
  start: z.coerce.number().positive("시작 절은 숫자여야 합니다."),
  end: z.coerce.number().positive("끝 절은 숫자여야 합니다."),
});

// 타입도 내보내서 다른 곳(Action 등)에서 재사용 가능하게 함
export type BulletinPayload = z.infer<typeof BulletinSchema>;