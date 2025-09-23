import { useEffect, useState } from 'react'
import usePlayer from '../../hooks/usePlayer'
import styles from './PlayerPromo.module.css'
import { getWinAndLose } from '../../helpers/playerHelpers'
import type { WinLose } from '../../types/playerTypes'
import { medals, unrankedMedal } from '../../data/medalsData'

const PlayerPromo: React.FC = () => {
    const { playerInfo } = usePlayer()
    const [winLose, setWinLose] = useState<WinLose>()
    const [winRate, setWinRate] = useState<number>()
    const [tier, setTier] = useState<number>(0)
    const [stars, setStars] = useState<number>(0)
    const [rankMedal, setRankMedal] = useState<string>('')
    const [rankName, setRankName] = useState<string>('')

    const profile = playerInfo?.profile
    const rankTier: number | null | undefined = playerInfo?.rank_tier
    const rankMmr: number | undefined = playerInfo?.computed_rating

    useEffect(() => {
        const winAndLose = async () => {
            const data = await getWinAndLose(profile?.account_id)

            setWinLose(data)
        }

        winAndLose()

        if (rankTier && rankMmr) {
            setTier(Math.floor(rankTier / 10) - 1)
            setStars(Math.floor(rankTier % 10))
        }
    }, [])

    useEffect(() => {
        if (tier === 0) {
            setRankName(unrankedMedal.name)
            setRankMedal(unrankedMedal.img)
        } else {
            setRankName(medals[tier][stars]?.name)
            setRankMedal(medals[tier][stars]?.img)
        }
    }, [tier, stars])

    useEffect(() => {
        if (winLose) {
            const currWinRate =
                (winLose.win / (winLose.win + winLose.lose)) * 100
            setWinRate(Number(String(currWinRate).slice(0, 5)))
        }
    }, [winLose])

    return (
        <>
            <section className={styles.promo}>
                <div className={styles.promo__row}>
                    <div className={styles.promo__profile}>
                        <img
                            src={profile?.avatarfull}
                            alt={profile?.personaname}
                        />
                        <div className={styles.text__contet}>
                            <p className={styles.text__name}>
                                {profile?.personaname}
                            </p>
                            <p className={styles.text}>
                                Аккаунт ID: {profile?.account_id}
                            </p>
                            {profile?.loccountrycode && (
                                <p className={styles.text}>
                                    Регион: {profile.loccountrycode}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={styles.ifno}>
                        <div className={styles.rank}>
                            {rankMedal && (
                                <img
                                    src={rankMedal}
                                    alt={rankMedal}
                                    className={styles.rank__img}
                                />
                            )}

                            <p className={styles.rank__name}>{rankName}</p>
                        </div>
                        {winRate ? (
                            <p className={styles.winrate}>
                                Винрейт: {winRate}%
                            </p>
                        ) : (
                            <p className={styles.winrate}>Загрузка...</p>
                        )}
                        <div className={styles.win__lose}>
                            <span className={styles.win}>
                                {winLose?.win} побед
                            </span>{' '}
                            -{' '}
                            <span className={styles.lose}>
                                {winLose?.lose} поражений
                            </span>{' '}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlayerPromo
