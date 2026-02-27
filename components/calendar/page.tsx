import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import CustomDateInput from "../customDateInput"
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";

registerLocale("ko", ko);

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      dateFormat="yyyy년 MM월 dd일"
      shouldCloseOnSelect
      selected={selectedDate}
      portalId="datepicker-portal"
      onChange={(date: Date | null) => {
        if (date) {
            const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            setSelectedDate(localDate);
        } else {
            setSelectedDate(null);
        }
      }}
      locale="ko"
      dropdownMode="select"
      customInput={<CustomDateInput></CustomDateInput>}
    />
  );
}