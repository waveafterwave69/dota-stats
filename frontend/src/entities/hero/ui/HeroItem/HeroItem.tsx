import React, { useMemo } from 'react'
import styles from './HeroItem.module.css'
import { PlayerHeroesI } from '@/entities/player/model/types'
import { formatLastPlayed } from '@/shared/lib/utils/formatters'
import { getHeroImage, getHeroName } from '@/shared/lib/utils/hero'

interface HeroItemProps {
    hero: PlayerHeroesI
}

const HeroItem: React.FC<HeroItemProps> = ({ hero }) => {
    const winRate = useMemo(() => {
        if (!hero.games) return '0%'
        return `${((hero.win / hero.games) * 100).toFixed(1)}%`
    }, [hero.win, hero.games])

    return (
        <li className={`${styles.item} ${styles.item__grid}`}>
            <div className={styles.item__hero}>
                <img
                    className={styles.item__img}
                    src={getHeroImage(hero.hero_id)}
                    alt={getHeroName(hero.hero_id)}
                />
                <div className={styles.item__meta}>
                    <p className={styles.item__name}>
                        {getHeroName(hero.hero_id)}
                    </p>
                    <p className={styles.item__date}>
                        {formatLastPlayed(hero.last_played)}
                    </p>
                </div>
            </div>

            <div className={styles.item__centerData}>
                <p className={styles.item__value}>{hero.games}</p>
                <div className={`${styles.bar} ${styles.bar_games}`} />
            </div>

            <div className={styles.item__centerData}>
                <p className={styles.item__value}>{winRate}</p>
                <div className={`${styles.bar} ${styles.bar_win}`} />
            </div>
        </li>
    )
}

export default HeroItem
