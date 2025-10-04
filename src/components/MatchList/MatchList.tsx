import { useCallback } from 'react'
import type { MatchData } from '../../types/matchTypes'
import MatchItem from '../MatchItem/MatchItem'
import styles from './MatchList.module.css'
import Spinner from '../../UI/Spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setWinLose } from '../../store/player/playerSlice'

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
    const dispatch = useAppDispatch()
    const winLose = useAppSelector((state) => state.player.winLose)

    const handleWin = useCallback(() => {
        dispatch(setWinLose(winLose === 1 ? null : 1))
    }, [dispatch, winLose])

    const handleLose = useCallback(() => {
        dispatch(setWinLose(winLose === 0 ? null : 0))
    }, [dispatch, winLose])

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
