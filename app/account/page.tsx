"use client"

export default function Account() {
    
    let months= [
        "01","02","03","04","05","06",
        "07","08","09","10","11","12"
    ]
    return(
        <div className="account-container">
            {months.map ((month, i) => (
                <a href={`/account/${month}`} key={month} className="account-month-card">{month}월</a>
            ))}
        </div>
    )
}