import { forwardRef } from "react";
import style from "./customDateInput.module.css"; // 기존 CSS 모듈 가져오기

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={style.input}           // 기존 input 클래스 재사용
        value={value ?? ""}               // 날짜 문자열 표시
        onClick={onClick}                 // 클릭 → 캘린더 열림
        readOnly                          // 직접 타이핑 방지 (iOS처럼)
        placeholder="날짜 선택"
      />
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;