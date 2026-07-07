import React, { useMemo } from 'react'

import styles from './MatchSide.module.css'

import { OneMatch } from '../../model/types'
import PlayerMatchItem from '@/entities/player/ui/PlayerMatchItem/PlayerMatchItem'

interface MatchSideProps {
    match: OneMatch
    side: 'radiant' | 'dire'
}

const MatchSide: React.FC<MatchSideProps> = ({ match, side }) => {
    const isRadiant = side === 'radiant'

    const radiantPlayers = useMemo(() => {
        return match.players.filter((player) => player.isRadiant === true)
    }, [match.players])

    const direPlayers = useMemo(() => {
        return match.players.filter((player) => player.isRadiant === false)
    }, [match.players])

    return (
        <div className={styles.table__wrapper}>
            <table className={styles.side}>
                <thead>
                    <tr className={styles.table__header}>
                        <th
                            className={`${styles.side__title} ${isRadiant ? styles.green : styles.red}`}
                        >
                            {isRadiant ? 'СИЛЫ СВЕТА' : 'СИЛЫ ТЬМЫ'}
                        </th>
                        <th
                            className={`${styles.table__item} ${styles.table__kda}`}
                        >
                            УСП
                        </th>
                        <th
                            className={`${styles.table__item} ${styles.table__gold}`}
                        >
                            золото
                        </th>
                        <th
                            className={`${styles.table__item} ${styles.table__creeps}`}
                        >
                            крипы
                        </th>
                        <th
                            className={`${styles.table__item} ${styles.table__gpm}`}
                        >
                            з/м
                        </th>
                        <th
                            className={`${styles.table__item} ${styles.table__xp}`}
                        >
                            о/м
                        </th>
                        <th className={styles.items}>предметы</th>
                    </tr>
                </thead>
                <tbody
                    className={`${styles.side__content} ${isRadiant ? styles.radiant__content : styles.dire__content}`}
                >
                    {isRadiant
                        ? radiantPlayers.map((player) => (
                              <PlayerMatchItem
                                  key={player.player_slot}
                                  player={player}
                              />
                          ))
                        : direPlayers.map((player) => (
                              <PlayerMatchItem
                                  key={player.player_slot}
                                  player={player}
                              />
                          ))}
                </tbody>
            </table>
        </div>
    )
}

export default MatchSide
