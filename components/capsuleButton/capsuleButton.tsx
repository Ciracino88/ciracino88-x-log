import style from './capsuleButton.module.css'

interface CapsuleButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: "primary" | "secondary" | "outline"
    size?: "sm" | "md" | "lg"
    disabled?: boolean
    className?: string
}

export default function CapsuleButton({
    children,
    onClick,
    variant = "primary",
    size = "md",
    disabled = false,
    className = ""
}: CapsuleButtonProps) {
    return(
        <button
            type='button'
            className={`
                ${style.capsuleButton}
                ${style[variant]}
                ${style[size]}
                ${disabled ? style.disabled : ""}
                ${className}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}