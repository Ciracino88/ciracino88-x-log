import style from "./customButton.module.css"

// 외부에서 버튼 로직과 이름을 받아오자. => interface
interface CustomButtonProps {
    children: React.ReactNode // 버튼 내부 요소 (텍스트, 아이콘 등)
    onClick?: () => void // 버튼 실행 로직
    type?: "button" | "submit" | "reset" // 버튼 타입
    disabled?: boolean // 버튼 비활성화 여부
    className?: string // 스타일 재적용하고 싶을 때 쓰기
}

export default function customButton({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
}: CustomButtonProps) {
    return(
        <button
            type={type}
            className={`${style.container} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span>{children}</span>
        </button>
    )
}