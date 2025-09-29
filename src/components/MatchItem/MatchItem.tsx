import styles from './MatchItem.module.css'
import type { MatchData } from '../../types/matchTypes'
import { Link } from 'react-router'
import { getHeroImage, getHeroName, getMedal } from '../../utils/utils'

const getMode = (gameMode: number): string => {
    switch (gameMode) {
        case 2:
            return 'All Pick'
        case 3:
            return "Captain's Mode"
        case 7:
            return 'Ranked'
        case 16:
            return 'Ranked'
        case 22:
            return 'Ranked'
        default:
            return 'Unknown Mode'
    }
}

interface MatchItemProps {
    match: MatchData
}

const MatchItem: React.FC<MatchItemProps> = ({ match }) => {
    return (
        <Link to={`/match/${match.match_id}`} className={styles.match}>
            <div className={styles.match__hero}>
                <img
                    src={getHeroImage(match.hero_id)}
                    alt={getHeroName(match.hero_id)}
                />
                <div className={styles.text__content}>
                    <span className={styles.hero__name}>
                        {getHeroName(match.hero_id)}
                    </span>

                    <p className={styles.match__win}>
                        {match.radiant_win
                            ? 'Победа сил света'
                            : 'Победа сил тьмы'}
                    </p>
                    <p className={styles.match__mode}>
                        Режим игры: {getMode(match.game_mode)}
                    </p>
                </div>
            </div>
            <div className={styles.match__res}>
                <span className={styles.match__kda}>
                    KDA: {match.kills}/{match.deaths}/{match.assists}
                </span>
            </div>
            {match.average_rank !== null && (
                <div className={styles.match__rank}>
                    <span>Средний ранг:</span>
                    <img
                        src={getMedal(match.average_rank).img}
                        alt={getMedal(match.average_rank).name}
                    />
                </div>
            )}
        </Link>
    )
}

export default MatchItem
