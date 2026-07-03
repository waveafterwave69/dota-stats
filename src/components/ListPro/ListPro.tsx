import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import type { ProPlayer, Team } from '../../types/proTypes'
import ProItem from '../ProItem/ProItem'
import Spinner from '../../UI/Spinner/Spinner'
import styles from './ListPro.module.css'

interface ListProProps {
    players: ProPlayer[]
    teams: Team[]
    searchPlayer: string
    isLoading: boolean
    searchTeam: ProPlayer[] | null // Исправлен тип: массив или null
}

const LIMIT_STEP = 20

const ListPro: React.FC<ListProProps> = ({
    players,
    teams,
    searchPlayer,
    isLoading,
    searchTeam,
}) => {
    const [limit, setLimit] = useState<number>(LIMIT_STEP)

    // Сбрасываем лимит на начальный при изменении строки поиска, чтобы скролл работал корректно
    useEffect(() => {
        setLimit(LIMIT_STEP)
    }, [searchPlayer])

    // Вычисляем финальный отфильтрованный массив игроков на лету (без стейтов и useEffect)
    const displayPlayers = useMemo(() => {
        // 1. Если выбрана конкретная команда, показываем только её игроков
        if (searchTeam) return searchTeam

        // 2. Если команды нет, но есть поисковый запрос по имени
        if (searchPlayer.trim()) {
            const cleanQuery = searchPlayer.toLowerCase().trim()
            return players.filter((player) =>
                player.name?.toLowerCase().includes(cleanQuery),
            )
        }

        // 3. Иначе возвращаем полный список игроков
        return players
    }, [players, searchPlayer, searchTeam])

    // Обрезаем массив под текущий лимит бесконечного скролла
    const visiblePlayers = useMemo(() => {
        // Если мы ищем по конкретной команде, бесконечный скролл не нужен (там обычно всего 5-10 человек)
        if (searchTeam) return displayPlayers
        return displayPlayers.slice(0, limit)
    }, [displayPlayers, limit, searchTeam])

    // Правильная реализация IntersectionObserver для бесконечного скролла
    const observer = useRef<IntersectionObserver | null>(null)

    const lastElementRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (isLoading) return
            if (observer.current) observer.current.disconnect()

            // Если элементов для показа больше нет, останавливаем наблюдение
            if (limit >= displayPlayers.length) return

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLimit((prev) => prev + LIMIT_STEP)
                }
            })

            if (node) observer.current.observe(node)
        },
        [isLoading, limit, displayPlayers.length],
    )

    const showEmptyState = !isLoading && visiblePlayers.length === 0

    return (
        <section className={styles.pro}>
            {showEmptyState ? (
                <div className={styles.empty_state}>Игроки не найдены</div>
            ) : (
                <ul className={styles.pro__list}>
                    {visiblePlayers.map((player, index) => {
                        // Вешаем реф СТРОГО на самый последний li-элемент в текущем списке
                        const isLastElement =
                            !searchTeam && index === visiblePlayers.length - 1

                        return (
                            <li
                                key={player.account_id}
                                ref={isLastElement ? lastElementRef : null}
                                className={styles.pro__listItem}
                            >
                                <ProItem player={player} teams={teams} />
                            </li>
                        )
                    })}
                </ul>
            )}

            {isLoading && (
                <div className={styles.spinner_container}>
                    <Spinner />
                </div>
            )}
        </section>
    )
}

export default ListPro
