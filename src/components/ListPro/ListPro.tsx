import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProPlayer, Team } from '../../types/proTypes'
import styles from './ListPro.module.css'
import ProItem from '../ProItem/ProItem'

interface ListProProps {
    players: ProPlayer[]
    teams: Team[]
    searchPlayer: string
    isLoading: boolean
    searchTeam: ProPlayer[]
    setSearchTeam: (players: ProPlayer[]) => void
}

const ListPro: React.FC<ListProProps> = ({
    players,
    teams,
    searchPlayer,
    isLoading,
    searchTeam,
}) => {
    const [limit, setLimit] = useState<number>(20)
    const [pro, setPro] = useState<ProPlayer[]>([])

    const observer = useRef<IntersectionObserver | null>(null)
    const lastMatchElementRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (isLoading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLimit((prevLimit) => prevLimit + 20)
                }
            })

            if (node) observer.current.observe(node)
        },
        [isLoading]
    )

    useEffect(() => {
        if (!searchPlayer) {
            setPro(players.slice(0, limit))
        } else {
            const filteredPlayers = players.filter((player) =>
                player.name
                    .toLowerCase()
                    .includes(searchPlayer.toLocaleLowerCase())
            )

            setPro(filteredPlayers.slice(0, limit))
        }
    }, [searchPlayer, limit, players])

    return (
        <>
            <section className={styles.pro}>
                <ul className={styles.pro__list}>
                    {searchTeam &&
                        searchTeam.map((player) => (
                            <ProItem
                                lastMatchElementRef={lastMatchElementRef}
                                player={player}
                                key={player.account_id}
                                teams={teams}
                            />
                        ))}
                </ul>
                {isLoading && <p>Загрузка...</p>}
                {!searchTeam && (
                    <ul className={styles.pro__list}>
                        {pro &&
                            pro.map((player) => (
                                <ProItem
                                    lastMatchElementRef={lastMatchElementRef}
                                    player={player}
                                    key={player.account_id}
                                    teams={teams}
                                />
                            ))}
                    </ul>
                )}
            </section>
        </>
    )
}

export default ListPro
