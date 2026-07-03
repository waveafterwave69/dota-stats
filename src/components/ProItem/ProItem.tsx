import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProPlayer, Team } from '../../types/proTypes'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchPlayerInfo } from '../../store/player/playerSlice'
import styles from './ProItem.module.css'

interface ProItemProps {
    player: ProPlayer
    teams: Team[]
}

const ProItem: React.FC<ProItemProps> = ({ player, teams }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isRedirecting, setIsRedirecting] = useState(false)

    // Находим логотип команды на лету без стейтов и эффектов
    const teamLogoUrl = useMemo(() => {
        if (!teams || !player.team_id) return ''
        const foundTeam = teams.find((team) => team.team_id === player.team_id)
        return foundTeam?.logo_url || ''
    }, [teams, player.team_id])

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (isRedirecting) return

        setIsRedirecting(true)
        const success = await dispatch(
            fetchPlayerInfo(String(player.account_id)),
        )
        setIsRedirecting(false)

        if (success) {
            navigate(`/player/${player.account_id}`)
        }
    }

    return (
        <div
            className={`${styles.playerCard} ${isRedirecting ? styles.playerCard_loading : ''}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
        >
            <div className={styles.playerCard__content}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={player.avatarfull}
                        alt={player.name || 'Pro Player'}
                        className={styles.playerCard__avatar}
                    />
                </div>

                <div className={styles.playerCard__info}>
                    <h3 className={styles.playerCard__nick}>
                        {player.name}
                        {player.personaname &&
                            player.personaname !== player.name && (
                                <span className={styles.playerCard__realName}>
                                    ({player.personaname})
                                </span>
                            )}
                    </h3>

                    <div className={styles.playerCard__meta}>
                        {player.team_name && (
                            <p className={styles.playerCard__text}>
                                <span className={styles.label}>Команда:</span>{' '}
                                {player.team_name}
                            </p>
                        )}
                        {player.loccountrycode && (
                            <p className={styles.playerCard__text}>
                                <span className={styles.label}>Регион:</span>{' '}
                                {player.loccountrycode}
                            </p>
                        )}
                        <p className={styles.playerCard__text}>
                            <span className={styles.label}>ID:</span>{' '}
                            {player.account_id}
                        </p>
                    </div>
                </div>
            </div>

            {teamLogoUrl && (
                <div className={styles.teamLogoWrapper}>
                    <img
                        src={teamLogoUrl}
                        alt=""
                        className={styles.teamCard__logo}
                    />
                </div>
            )}
        </div>
    )
}

export default ProItem
