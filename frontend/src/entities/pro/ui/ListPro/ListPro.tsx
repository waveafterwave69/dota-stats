import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './ListPro.module.css'

import { ProPlayer, Team } from '../../model/types'
import ProItem from '../ProItem/ProItem'
import { Spinner } from '@/shared/ui'

interface ListProProps {
    players: ProPlayer[]
    teams: Team[]
    searchPlayer: string
    isLoading: boolean
    searchTeam: ProPlayer[] | null
}

const LIMIT_STEP = 20

const ListPro: React.FC<ListProProps> = ({
    players,
    teams,
    searchPlayer,
    isLoading,
    searchTeam,
}) => {
    const [limit, setLimit] = useState<number>(LIMIT_STEP)

    useEffect(() => {
        setLimit(LIMIT_STEP)
    }, [searchPlayer])

    const displayPlayers = useMemo(() => {
        if (searchTeam) return searchTeam

        if (searchPlayer.trim()) {
            const cleanQuery = searchPlayer.toLowerCase().trim()
            return players.filter((player) =>
                player.name?.toLowerCase().includes(cleanQuery),
            )
        }

        return players
    }, [players, searchPlayer, searchTeam])

    const visiblePlayers = useMemo(() => {
        if (searchTeam) return displayPlayers
        return displayPlayers.slice(0, limit)
    }, [displayPlayers, limit, searchTeam])

    const observer = useRef<IntersectionObserver | null>(null)

    const lastElementRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (isLoading) return
            if (observer.current) observer.current.disconnect()

            if (limit >= displayPlayers.length) return

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLimit((prev) => prev + LIMIT_STEP)
                }
            })

            if (node) observer.current.observe(node)
        },
        [isLoading, limit, displayPlayers.length],
    )

    const showEmptyState = !isLoading && visiblePlayers.length === 0

    return (
        <section className={styles.pro}>
            {showEmptyState ? (
                <div className={styles.empty_state}>Игроки не найдены</div>
            ) : (
                <ul className={styles.pro__list}>
                    {visiblePlayers.map((player, index) => {
                        const isLastElement =
                            !searchTeam && index === visiblePlayers.length - 1

                        return (
                            <li
                                key={player.account_id}
                                ref={isLastElement ? lastElementRef : null}
                                className={styles.pro__listItem}
                            >
                                <ProItem player={player} teams={teams} />
                            </li>
                        )
                    })}
                </ul>
            )}

            {isLoading && (
                <div className={styles.spinner_container}>
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default ListPro
