import { getMatches } from '../../helpers/matchesHelpers'
import usePlayer from '../../hooks/usePlayer'
import type { MatchData } from '../../types/matchTypes'
import MatchItem from '../MatchItem/MatchItem'
import styles from './MatchList.module.css'
import React, { useEffect, useState } from 'react'

const MatchList: React.FC = () => {
    const { playerInfo } = usePlayer()
    const [matches, setMatches] = useState<MatchData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true)
                const data = await getMatches(playerInfo?.profile?.account_id)
                setMatches(data)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        if (playerInfo?.profile?.account_id) {
            fetchMatches()
        }
    }, [playerInfo?.profile?.account_id])

    return (
        <section className={styles.list}>
            <h2 className={styles.list__title}>Последние игры</h2>
            {error && error}
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <ul className={styles.list__games}>
                    {matches.map((match) => (
                        <MatchItem key={match.match_id} match={match} />
                    ))}
                </ul>
            )}
        </section>
    )
}

export default MatchList
