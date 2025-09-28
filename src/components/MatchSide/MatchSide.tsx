import type { OneMatch } from '../../types/matchTypes'
import PlayerMatchItem from '../PlayerMatchItem/PlayerMatchItem'
import styles from './MatchSide.module.css'

interface MatchSideProps {
    match: OneMatch
    side: 'radiant' | 'dire'
}

const MatchSide: React.FC<MatchSideProps> = ({ match, side }) => {
    const isRadiant = side === 'radiant'

    const radiantPlayers = match.players.filter((player) => {
        return player.isRadiant === true
    })

    const direPlayers = match.players.filter((player) => {
        return player.isRadiant === false
    })

    return (
        <>
            <table className={styles.side}>
                <thead>
                    <tr className={styles.table__header}>
                        <th
                            className={`${styles.side__title} ${
                                isRadiant ? styles.green : styles.red
                            }`}
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
                    className={`${styles.side__content} ${
                        isRadiant
                            ? styles.radiant__content
                            : styles.dire__content
                    }`}
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
        </>
    )
}

export default MatchSide
