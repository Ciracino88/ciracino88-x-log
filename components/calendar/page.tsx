import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "../customDateInput/customDateInput"
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";

registerLocale("ko", ko);

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function Calendar({ value, onChange }: CalendarProps) {
  return (
    <DatePicker
      dateFormat="yyyy년 MM월 dd일"
      shouldCloseOnSelect
      selected={value}
      portalId="datepicker-portal"
      onChange={(date: Date | null) => {
        if (date) {
            const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            onChange(localDate);
        } else {
            onChange(null);
        }
      }}
      locale="ko"
      dropdownMode="select"
      customInput={<CustomDateInput></CustomDateInput>}
    />
  );
}