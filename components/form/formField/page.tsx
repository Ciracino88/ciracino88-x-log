// 01. text - 일반적인 텍스트를 받을 때
// 02. number - 숫자를 입력받을 때
// 03. date - 날짜를 입력받을 때 -> calendar 컴포넌트로 처리하기
// 04. select - 자동완성 또는 특정 목록 안에서 값을 택할 때 -> selector 컴포넌트로 처리하기
// 05. textarea - 긴 글을 작성할 때

import "react-datepicker/dist/react-datepicker.css"
import style from "./formField.module.css"
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface FormFieldProps {
    label: string;
    type: "text" | "number" | "date" | "select" | "textarea";
    options?: { label: string; value: any }[];
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    min?: number;
    max?: number;
}

registerLocale("ko", ko);

export default function FormField({
    options, value, onChange, ...rest
}: FormFieldProps) {
    const CommonInput = forwardRef<HTMLInputElement, any>((props, ref) => (
        <input 
            {...props} 
            ref={ref} 
            className={style.input} 
            readOnly={rest.type === "date"}
        />
    ));
    CommonInput.displayName = "CommonInput";

    return (
        <div className={style.field}>
            <label>{rest.label}</label>

            <div className={style.container}>
                {(() => {
                    switch (rest.type) {
                        case "date":
                            return (
                                <DatePicker
                                    {...rest}
                                    selected={value ? new Date(value) : null}
                                    dateFormat="yyyy년 MM월 dd일"
                                    locale="ko"
                                    customInput={<CommonInput />} 
                                    onChange={onChange}
                                    portalId="datepicker-portal"
                                />
                            );

                        case "select":
                            const currentValue = (value === "" || value === undefined) ? null : value;
                            return (
                                <Autocomplete
                                    options={options || []}
                                    getOptionLabel={(option) => option.label || ""}
                                    value={options?.find((opt) => opt.value === currentValue) || null}
                                    onChange={(_, newValue) => onChange(newValue?.value || null)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder={rest.placeholder}
                                            variant="standard" // MUI의 기본 테두리를 제거
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    disableUnderline: true,
                                                },
                                            }}
                                        />
                                    )}
                                    className={style.input}
                                />
                            );

                        case "textarea":
                            return (
                                <TextareaAutosize
                                    className={style.textarea}
                                    value={value || ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    placeholder={rest.placeholder}
                                    minRows={4} // 아무것도 입력 안해도 4줄 분량은 공간 차지
                                    maxRows={15} // 15줄 넘어가면 영역이 늘어나지 않고, 스크롤로 대체
                                    cacheMeasurements
                                />
                            );

                        // text, number 처리
                        default:
                            return (
                                <CommonInput 
                                    {...rest}
                                    type={rest.type}
                                    value={value || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        let val: string | number = e.target.value;

                                        if (rest.type === "number") {
                                            const n_val = Number(val);

                                            if (rest.min !== undefined && n_val < Number(rest.min)) return;
                                            if (rest.max !== undefined && n_val > Number(rest.max)) return;

                                            val = isNaN(n_val) ? "" : n_val;
                                        }

                                        onChange(val)
                                    }}
                                    placeholder={rest.placeholder}
                                />
                            );
                    }
                })()}
            </div>
        </div>
    );
}