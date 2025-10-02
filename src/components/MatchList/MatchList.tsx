import type { MatchData } from '../../types/matchTypes'
import MatchItem from '../MatchItem/MatchItem'
import styles from './MatchList.module.css'
import usePlayer from '../../hooks/usePlayer'
import React from 'react'
import Spinner from '../../UI/Spinner/Spinner'

interface MatchListProps {
    error: string | null
    matches: MatchData[] | undefined
    loading: boolean
    title?: string
    winOrLose?: boolean
    lastMatchElementRef?: (node: HTMLLIElement | null) => void
    themeLoading?: boolean
}

const MatchList: React.FC<MatchListProps> = ({
    error,
    matches,
    loading,
    title = 'Последние игры',
    winOrLose,
    lastMatchElementRef,
    themeLoading,
}) => {
    const { setWinLose, winLose } = usePlayer()

    const handleWin = () => {
        if (winLose === 1) {
            setWinLose(null)
        } else {
            setWinLose(1)
        }
    }

    const handleLose = () => {
        if (winLose === 0) {
            setWinLose(null)
        } else {
            setWinLose(0)
        }
    }

    return (
        <section className={styles.list}>
            <h2 className={styles.list__title}>{title}</h2>
            {winOrLose && (
                <ul className={styles.winlose__list}>
                    <li>
                        <button
                            className={`${styles.winlose__item} ${styles.win} ${
                                winLose === 1 && styles.active
                            }`}
                            onClick={handleWin}
                        >
                            Победы
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.winlose__item} ${
                                styles.lose
                            } ${winLose === 0 && styles.active}`}
                            onClick={handleLose}
                        >
                            Поражения
                        </button>
                    </li>
                </ul>
            )}
            {error && error}
            <ul className={styles.list__games}>
                {themeLoading ? (
                    <Spinner />
                ) : (
                    matches &&
                    matches.map((match, index) => (
                        <li
                            key={match.match_id}
                            ref={
                                index === matches.length - 1
                                    ? lastMatchElementRef
                                    : null
                            }
                        >
                            <MatchItem match={match} />
                        </li>
                    ))
                )}
            </ul>
            {loading && !themeLoading && <p>Загрузка...</p>}
        </section>
    )
}

export default MatchList
