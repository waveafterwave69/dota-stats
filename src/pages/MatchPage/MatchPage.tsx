import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneMatch } from '../../helpers/matchesHelpers'
import type { OneMatch } from '../../types/matchTypes'
import { secondsToHMS } from '../../utils/utils'
import MatchSide from '../../components/MatchSide/MatchSide'
import Spinner from '../../UI/Spinner/Spinner'
import styles from './MatchPage.module.css'

const MatchPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [match, setMatch] = useState<OneMatch | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                setLoading(true)
                setIsError(false)
                const data = await getOneMatch(id)
                if (data) {
                    setMatch(data)
                } else {
                    setIsError(true)
                }
            } catch (err) {
                setIsError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchMatch()
    }, [id])

    if (loading) {
        return (
            <div className={styles.centered_container}>
                <Spinner />
            </div>
        )
    }

    if (isError || !match) {
        return (
            <div className={styles.centered_container}>
                <p className={styles.error_text}>
                    Не удалось загрузить данные матча.
                </p>
            </div>
        )
    }

    const formattedDuration = secondsToHMS(match.duration)

    return (
        <section className={styles.match}>
            <div className={styles.match__header}>
                <h2
                    className={`${styles.win__text} ${match.radiant_win ? styles.green : styles.red}`}
                >
                    {match.radiant_win ? 'ПОБЕДА СИЛ СВЕТА' : 'ПОБЕДА СИЛ ТЬМЫ'}
                </h2>

                <div className={styles.match__scoreBoard}>
                    <span className={styles.radian__score}>
                        {match.radiant_score}
                    </span>
                    <span className={styles.duration}>{formattedDuration}</span>
                    <span className={styles.dire__score}>
                        {match.dire_score}
                    </span>
                </div>
            </div>

            <div className={styles.sides}>
                <MatchSide match={match} side="radiant" />
                <MatchSide match={match} side="dire" />
            </div>
        </section>
    )
}

export default MatchPage
