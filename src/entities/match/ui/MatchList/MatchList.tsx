import React, { useCallback } from 'react'

import styles from './MatchList.module.css'

import { useAppDispatch, useAppSelector } from '@/app/providers/store/types'
import { MatchData } from '../../model/types'
import { setWinLose } from '@/entities/player/model/playerSlice'
import { Spinner } from '@/shared/ui'
import MatchItem from '../MatchItem/MatchItem'

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
                <div className={styles.winlose__filters}>
                    <button
                        type="button"
                        className={`${styles.winlose__button} ${styles.win} ${winLose === 1 ? styles.active : ''}`}
                        onClick={handleWin}
                    >
                        Победы
                    </button>
                    <button
                        type="button"
                        className={`${styles.winlose__button} ${styles.lose} ${winLose === 0 ? styles.active : ''}`}
                        onClick={handleLose}
                    >
                        Поражения
                    </button>
                </div>
            )}

            {error && (
                <div className={styles.error_message} role="alert">
                    {error}
                </div>
            )}

            <ul className={styles.list__games}>
                {themeLoading ? (
                    <div className={styles.spinner_container}>
                        <Spinner />
                    </div>
                ) : (
                    matches?.map((match, index) => (
                        <li
                            key={match.match_id}
                            ref={
                                index === matches.length - 1
                                    ? lastMatchElementRef
                                    : null
                            }
                            className={styles.list__gameItem}
                        >
                            <MatchItem match={match} />
                        </li>
                    ))
                )}
            </ul>

            {loading && !themeLoading && (
                <div className={styles.loading_more}>
                    <Spinner />
                    <span>Загрузка матчей...</span>
                </div>
            )}
        </section>
    )
}

export default MatchList
