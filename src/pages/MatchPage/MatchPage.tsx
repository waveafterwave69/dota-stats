import styles from './MatchPage.module.css'
import { useEffect, useState } from 'react'
import { getOneMatch } from '../../helpers/matchesHelpers'
import { useParams } from 'react-router'
import type { OneMatch } from '../../types/matchTypes'
import { secondsToHMS } from '../../utils/utils'
import MatchSide from '../../components/MatchSide/MatchSide'

const MatchPage: React.FC = () => {
    const params = useParams()
    const [match, setMatch] = useState<OneMatch | null>(null)

    useEffect(() => {
        const fetchMatch = async () => {
            const data = await getOneMatch(params.id)
            setMatch(data)
        }

        fetchMatch()
    }, [params.id])

    const formattedDuration = match ? secondsToHMS(match.duration) : 'N/A'

    return (
        <>
            <section className={styles.match}>
                {match ? (
                    <>
                        <h3 className={styles.win}>
                            {match?.radiant_win ? (
                                <p
                                    className={`${styles.win__text} ${styles.green}`}
                                >
                                    ПОБЕДА СИЛ СВЕТА
                                </p>
                            ) : (
                                <p
                                    className={`${styles.win__text} ${styles.red}`}
                                >
                                    ПОБЕДА СИЛ ТЬМЫ
                                </p>
                            )}
                        </h3>
                        <div className={styles.match__info}>
                            <div className={styles.radian__score}>
                                {match.radiant_score}
                            </div>
                            <p className={styles.duration}>
                                {formattedDuration}
                            </p>
                            <div className={styles.dire__score}>
                                {match.dire_score}
                            </div>
                        </div>
                        <div className={styles.sides}>
                            <MatchSide match={match} side="radiant" />
                            <MatchSide match={match} side="dire" />
                        </div>
                    </>
                ) : (
                    <p>Загрузка...</p>
                )}
            </section>
        </>
    )
}

export default MatchPage
