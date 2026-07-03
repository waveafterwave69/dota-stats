import React from 'react'
import { Link } from 'react-router-dom'
import type { MatchData } from '../../types/matchTypes'
import { getHeroImage, getHeroName, getMedal } from '../../utils/utils'
import styles from './MatchItem.module.css'

// Маппинг игровых режимов Dota 2 для быстрой и чистой работы без switch-case
const GAME_MODES: Record<number, string> = {
    0: 'Unknown',
    1: 'All Pick',
    2: "Captain's Mode",
    3: 'Random Draft',
    4: 'Single Draft',
    5: 'All Random',
    7: 'Diretide',
    8: "Reverse Captain's Mode",
    9: 'The Greeviling',
    10: 'Tutorial',
    11: 'Mid Only',
    12: 'Least Played',
    13: 'Limited Heroes',
    14: 'Compendium Matchmaking',
    15: 'Custom',
    16: "Captain's Draft",
    17: 'Balanced Draft',
    18: 'Ability Draft',
    20: 'All Random Deathmatch',
    21: '1v1 Solo Mid',
    22: 'All Pick (Ranked)',
    23: 'Turbo', // Тот самый режим Турбо
    24: 'Mutation',
}

interface MatchItemProps {
    match: MatchData
}

const MatchItem: React.FC<MatchItemProps> = ({ match }) => {
    const heroName = getHeroName(match.hero_id)

    /* 
    Вычисляем, за какую команду играл юзер. 
    В OpenDota API первые 5 игроков (0-4) — это Radiant, остальные (128-132) — Dire.
    Если player_slot < 128, игрок за Сил Света (Radiant).
  */
    const isRadiantPlayer = match.player_slot < 128
    const isUserWin = isRadiantPlayer === match.radiant_win

    const gameModeName = GAME_MODES[match.game_mode] || 'Unknown Mode'

    return (
        <Link
            to={`/match/${match.match_id}`}
            className={`${styles.match} ${isUserWin ? styles.match_win : styles.match_lose}`}
        >
            <div className={styles.match__hero}>
                <div className={styles.match__heroImgWrapper}>
                    <img
                        src={getHeroImage(match.hero_id)}
                        alt={heroName}
                        className={styles.hero__img}
                    />
                </div>

                <div className={styles.text__content}>
                    <span className={styles.hero__name}>{heroName}</span>
                    <span
                        className={`${styles.match__status} ${isUserWin ? styles.text_green : styles.text_red}`}
                    >
                        {isUserWin ? 'Победа' : 'Поражение'}
                    </span>
                    <p className={styles.match__mode}>{gameModeName}</p>
                </div>
            </div>

            <div className={styles.match__res}>
                <div className={styles.kda__label}>KDA</div>
                <span className={styles.match__kda}>
                    {match.kills}
                    <span className={styles.kda__slash}>/</span>
                    <span className={styles.kda__deaths}>{match.deaths}</span>
                    <span className={styles.kda__slash}>/</span>
                    {match.assists}
                </span>
            </div>

            {match.average_rank !== null && (
                <div className={styles.match__rank}>
                    <span className={styles.rank__title}>Ранг матча</span>
                    <div className={styles.rank__medalWrapper}>
                        <img
                            src={getMedal(match.average_rank).img}
                            alt={getMedal(match.average_rank).name}
                            title={getMedal(match.average_rank).name}
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}

export default MatchItem
