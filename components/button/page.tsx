import style from "./button.module.css"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;

    // 옵션 설정

    // 1. primary - 파란색 배경, 흰색 폰트 (둘러보기, 토글, 저장)
    // 2. secondary - 연한 회색 배경 (작성 취소, 돌아가기)
    // 3. outline - 배경 x, 테두리만 존재 (로그아웃, 관리자 페이지 이동)
    // 4. social (kakao, google) - 플랫폼 고유 컬러 적용 (구글/카카오 로그인)
    // 5. danger - 빨간색 (삭제하기, 탈퇴하기, 제명)
    variant?: "primary" | "secondary" | "google" | "kakao" | "outline" | "danger";
    shape?: "capsule" | "square";
    size?: "s" | "m" | "l";
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
}

export default function Button({
    children, onClick,
    variant = "primary",
    shape = "capsule",
    size = "m",
    type = "button",
    icon
}: ButtonProps) {
    return(
        <button
            type={type}
            onClick={onClick}
            className={`${style.btn} ${style[variant]} ${style[shape]} ${style[size]}`}
        >
            {icon && <span className={style.icon}>{icon}</span>}
            {children}
        </button>
    )
}