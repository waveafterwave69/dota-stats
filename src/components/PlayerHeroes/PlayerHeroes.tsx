import { useEffect, useState } from 'react'
import type { PlayerHeroesI } from '../../types/playerTypes'
import styles from './PlayerHeroes.module.css'
import HeroItem from '../HeroItem/HeroItem'

interface PlayerHeroesProps {
    heroes: PlayerHeroesI[]
    loading: boolean
}

const PlayerHeroes: React.FC<PlayerHeroesProps> = ({ heroes, loading }) => {
    const [limitHeroes, setLimitHeroes] = useState<PlayerHeroesI[]>([])
    const [limit, setLimit] = useState<number>(10)

    useEffect(() => {
        setLimitHeroes(heroes.slice(0, limit))
    }, [limit, heroes])

    const handleMore = () => {
        if (limit < heroes.length) {
            setLimit((prev) => (prev += 10))
        }
    }

    const handleClear = () => {
        setLimit(10)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <section className={styles.heroes}>
                <div className={styles.heroes__titles}>
                    <h2 className={styles.title__main}>Лучшие герои</h2>
                    <h3 className={styles.title}>Матчи</h3>
                    <h2 className={styles.title}>Винрейт</h2>
                </div>
                {loading ? (
                    <p>Заргузка...</p>
                ) : (
                    <>
                        <ul className={styles.heroes__list}>
                            {limitHeroes &&
                                limitHeroes.map((hero) => (
                                    <HeroItem key={hero.hero_id} hero={hero} />
                                ))}
                        </ul>
                        <div className={styles.buttons}>
                            <button
                                disabled={limit == 10}
                                onClick={handleClear}
                                className={styles.heroes__button}
                            >
                                Скрыть
                            </button>
                            <button
                                disabled={limit > heroes.length}
                                onClick={handleMore}
                                className={styles.heroes__button}
                            >
                                Больше
                            </button>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}

export default PlayerHeroes
