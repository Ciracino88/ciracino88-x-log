import style from "./profile.module.css"

export default function profile() {
    const profile_members = [
        {
            name: "김진규",
            position: "회장",
            img_url: "hamzzi02.jpg",
            comment: [`“야 나 봐! 손바닥 오픈!”
유리벽에 대고 하이파이브 날리는 중
세상에서 제일 귀여운 손바닥 보여주기 챔피언`]
        },
        {
            name: "유수민",
            position: "부회장",
            img_url: "hamzzi03.jpg",
            comment: [`작은 바텐더 쥑쥑이 등장
오늘의 주문은 호랑이 소주 한 잔이래요
취한 척 눈 반짝이며 손님 맞이 중`]
        },
        {
            name: "김민진",
            position: "총무",
            img_url: "hamzzi04.jpg",
            comment: [`방금 세상에서 제일 포근한 이불 속에서 나온 느낌
손으로 얼굴 감싸 쥐고 있는 중
지금 세상 누구보다 따뜻하고 졸림`]
        },
        {
            name: "조은혜",
            position: "서기",
            img_url: "hamzzi05.jpg",
            comment: [`“여기가 내 새 집 입구야”
벽 뚫는 척 폼 잡는 중
실제론 그냥 귀여운 포즈 연습생입니다`]
        },
        {
            name: "이승호",
            position: "회계",
            img_url: "hamzzi06.jpg",
            comment: [`쿨한 척 선글라스 끼고
핑크 와플 한 입 베어 물었더니
이미 표정이 풀려버린 쿨하지 못한 쿨가이`]
        }
    ]
    return(
        <div className={style.profile_container}>
            {profile_members.map((member, i) => (
                <div className={style.profile_card} key={i}>
                <div className={style.profile_card_img}>
                    <img src={member.img_url}></img>
                </div>
                <div className={style.profile_divider}></div>
                <div className={style.profile_card_info}>
                    <div className={style.profile_card_title}>
                        <span className={style.profile_card_name}>{member.name}</span>
                        <span className={style.profile_card_bio}>{member.position}</span>
                    </div>
                    <div className={style.profile_card_bio}>
                        {member.comment}
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}