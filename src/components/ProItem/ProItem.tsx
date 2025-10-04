import { useNavigate } from 'react-router'
import type { ProPlayer, Team } from '../../types/proTypes'
import styles from './ProItem.module.css'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchPlayerInfo } from '../../store/player/playerSlice'

interface ProItemProps {
    player: ProPlayer
    teams: Team[]
    lastMatchElementRef?: (node: HTMLLIElement | null) => void
}

const ProItem: React.FC<ProItemProps> = ({
    player,
    teams,
    lastMatchElementRef,
}) => {
    const dispatch = useAppDispatch()

    const [currTeam, setCurrTeam] = useState<string>('')

    const navigate = useNavigate()

    const onClick = async (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        e.preventDefault()

        const success = await dispatch(
            fetchPlayerInfo(String(player.account_id))
        )

        if (success) {
            navigate(`/player/${player.account_id}`)
        }
    }

    useEffect(() => {
        if (teams) {
            const playerTeam: Team[] = teams.filter(
                (team) => team.team_id === player.team_id
            )

            setCurrTeam(playerTeam[0]?.logo_url)
        }
    }, [])

    return (
        <>
            <li className={styles.player} ref={lastMatchElementRef}>
                <div className={styles.player__content}>
                    <img
                        src={player.avatarfull}
                        alt={player.name}
                        className={styles.pro__img}
                    />
                    <div className={styles.pro__text}>
                        <h4 className={styles.pro__nick}>{player.name}</h4>
                        {player.loccountrycode && (
                            <p>Регион: {player.loccountrycode}</p>
                        )}
                        <p>Команда: {player.team_name}</p>
                        {player.personaname && (
                            <p>
                                Профиль:{' '}
                                <span
                                    onClick={onClick}
                                    className={styles.player__link}
                                >
                                    {player.personaname}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {currTeam && (
                    <img src={currTeam} alt="" className={styles.team__img} />
                )}
            </li>
        </>
    )
}

export default ProItem
