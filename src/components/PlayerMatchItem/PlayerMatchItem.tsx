import { useNavigate } from 'react-router'
import type { Player } from '../../types/matchTypes'
import { getHeroImage, getHeroName } from '../../utils/utils'
import styles from './PlayerMatchItem.module.css'
import useDota from '../../hooks/useDota'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchPlayerInfo } from '../../store/player/playerSlice'

interface PlayerMatchItemProps {
    player: Player
}

const PlayerMatchItem: React.FC<PlayerMatchItemProps> = ({ player }) => {
    const { items } = useDota()
    const dispatch = useAppDispatch()

    const itemIds = [
        player.item_0,
        player.item_1,
        player.item_2,
        player.item_3,
        player.item_4,
        player.item_5,
    ]

    const navigate = useNavigate()

    const onClick = async (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        e.preventDefault()

        const success = await dispatch(
            fetchPlayerInfo(String(player.account_id))
        )

        if (success && player.personaname) {
            navigate(`/player/${player.account_id}`)
        }
    }

    return (
        <tr className={styles.player__card}>
            <td className={styles.player__hero}>
                <img
                    src={getHeroImage(player.hero_id)}
                    alt={getHeroName(player.hero_id)}
                />
                <p onClick={onClick}>
                    {player.personaname || (
                        <span className={styles.anon}>Аноним</span>
                    )}
                </p>
            </td>
            <td className={styles.player__kda}>
                {player.kills}/{player.deaths}/{player.assists}
            </td>
            <td className={styles.gold}>{player.net_worth}</td>
            <td className={styles.creeps}>
                {player.last_hits}/{player.denies}
            </td>
            <td className={styles.gpm}>{player.gold_per_min}</td>
            <td className={styles.xpm}>{player.xp_per_min}</td>
            <td className={styles.items}>
                <div className={styles.itemsContainer}>
                    {items &&
                        itemIds.map((itemId, index) => {
                            const needItem = items.filter(
                                (item) => item.id === itemId
                            )
                            return (
                                <img
                                    key={index}
                                    src={`https://cdn.steamstatic.com${needItem[0]?.img}`}
                                    alt=""
                                    className={styles.item__img}
                                />
                            )
                        })}
                </div>
            </td>
        </tr>
    )
}

export default PlayerMatchItem
