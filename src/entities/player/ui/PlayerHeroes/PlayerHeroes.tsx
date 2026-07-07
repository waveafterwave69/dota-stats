import React, { useState, useMemo } from 'react'
import type { PlayerHeroesI } from '../../types/playerTypes'
import HeroItem from '../HeroItem/HeroItem'
import styles from './PlayerHeroes.module.css'

interface PlayerHeroesProps {
    heroes: PlayerHeroesI[]
    loading: boolean
}

const INITIAL_LIMIT = 8
const LIMIT_STEP = 8

const PlayerHeroes: React.FC<PlayerHeroesProps> = ({ heroes, loading }) => {
    const [limit, setLimit] = useState<number>(INITIAL_LIMIT)

    const visibleHeroes = useMemo(() => {
        return heroes.slice(0, limit)
    }, [heroes, limit])

    const handleMore = () => {
        setLimit((prev) => prev + LIMIT_STEP)
    }

    const handleClear = () => {
        setLimit(INITIAL_LIMIT)
        window.scrollTo(0, 250)
    }

    const hasMore = limit < heroes.length

    return (
        <section className={styles.heroes}>
            <div className={styles.heroes__titles}>
                <h2 className={styles.title__main}>Лучшие герои</h2>
                <div className={styles.heroes__statsTitles}>
                    <span className={styles.title}>Матчи</span>
                    <span className={styles.title}>Винрейт</span>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Загрузка героев...</div>
            ) : (
                <>
                    <ul className={styles.heroes__list}>
                        {visibleHeroes &&
                            visibleHeroes.map((hero) => (
                                <HeroItem key={hero.hero_id} hero={hero} />
                            ))}
                    </ul>

                    <div className={styles.buttons}>
                        <button
                            disabled={limit === INITIAL_LIMIT}
                            onClick={handleClear}
                            className={styles.heroes__button}
                        >
                            Скрыть
                        </button>
                        <button
                            disabled={!hasMore}
                            onClick={handleMore}
                            className={`${styles.heroes__button} ${styles.heroes__button_primary}`}
                        >
                            Больше
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}

export default PlayerHeroes
