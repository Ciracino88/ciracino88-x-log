import style from "./accountDetailHeader.module.css"

interface AccountDetailHeaderProps {
    children: React.ReactNode
}

export default function AccountDetailHeader({
    children
}: AccountDetailHeaderProps) {
    
    return(
        <h4 className={ style.account_detail_title }>{children}</h4>
    )
}