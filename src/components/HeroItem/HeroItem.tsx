import type { PlayerHeroesI } from '../../types/playerTypes'
import { getHeroImage, getHeroName } from '../../utils/utils'
import styles from './HeroItem.module.css'

interface HeroItemProps {
    hero: PlayerHeroesI
}

const HeroItem: React.FC<HeroItemProps> = ({ hero }) => {
    return (
        <>
            <li className={styles.item}>
                <div className={styles.item__hero}>
                    <img
                        className={styles.item__img}
                        src={getHeroImage(hero.hero_id)}
                        alt={getHeroName(hero.hero_id)}
                    />
                    <p className={styles.item__name}>
                        {getHeroName(hero.hero_id)}
                    </p>
                </div>
                <p className={styles.item__games}>{hero.games}</p>
                <p className={styles.item__win}>
                    {hero.games ? (
                        <span>
                            {String((hero.win / hero.games) * 100).slice(0, 2)}%
                        </span>
                    ) : (
                        <span>0%</span>
                    )}
                </p>
            </li>
        </>
    )
}

export default HeroItem
