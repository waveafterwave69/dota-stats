import usePlayer from '../../hooks/usePlayer'
import styles from './PlayerPromo.module.css'

const PlayerPromo: React.FC = () => {
    const { playerInfo, loading, error } = usePlayer()

    console.log(playerInfo)

    const profile = playerInfo?.profile
    const rankTier = playerInfo?.rank_tier

    let rankDisplay

    if (loading) {
        rankDisplay = <p>Загрузка ранга...</p>
    } else if (error) {
        rankDisplay = <p>Ошибка: {error}</p>
    } else if (rankTier) {
        // Логика отображения ранга (пример)
        let medal = ''
        let star = ''

        const tier = Math.floor(rankTier / 10) // 1-8 соответствуют медалям Herald, Guardian, Crusader и т.д.
        const starNum = rankTier % 10 // 1-5 звезды внутри каждой медали

        switch (tier) {
            case 1:
                medal = 'Herald'
                break
            case 2:
                medal = 'Guardian'
                break
            case 3:
                medal = 'Crusader'
                break
            case 4:
                medal = 'Archon'
                break
            case 5:
                medal = 'Legend'
                break
            case 6:
                medal = 'Ancient'
                break
            case 7:
                medal = 'Divine'
                break
            case 8:
                medal = 'Immortal'
                break
            default:
                medal = 'Unranked'
        }

        if (medal !== 'Unranked' && medal !== 'Immortal') {
            star = ` (Звезда ${starNum})`
        }

        rankDisplay = (
            <p>
                Ранг: {medal}
                {star}
            </p>
        )

        // Альтернативный вариант: можно использовать изображения медалей и звезд
        // rankDisplay = (
        //   <div>
        //     <img src={`/images/medals/${medal.toLowerCase()}.png`} alt={medal} />
        //     {star && <img src={`/images/stars/${starNum}.png`} alt={`Звезда ${starNum}`} />}
        //   </div>
        // );
    } else {
        rankDisplay = <p>Ранг не найден.</p>
    }

    return (
        <>
            <section className={styles.promo}>
                <div className={styles.promo__row}>
                    <div className={styles.promo__profile}>
                        <img src={profile?.avatarfull} alt="" />
                        <div className={styles.text__contet}>
                            <p>Имя: {profile?.personaname}</p>
                            <p>Аккаунт ID: {profile?.account_id}</p>
                            <p>Регион: {profile?.loccountrycode}</p>
                        </div>
                    </div>
                    <div className={styles.rank}>{rankDisplay}</div>
                </div>
            </section>
        </>
    )
}

export default PlayerPromo
