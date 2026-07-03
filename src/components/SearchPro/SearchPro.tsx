import React, { useState, useMemo, useRef, useEffect } from 'react'
import type { Team } from '../../types/proTypes'
import Spinner from '../../UI/Spinner/Spinner'
import styles from './SearchPro.module.css'

interface SearchProProps {
    teams: Team[]
    isLoading: boolean
    setSearchPlayer: (el: string) => void
    setCurrTeams: (team: Team | null) => void
    currTeams: Team | null
}

const SearchPro: React.FC<SearchProProps> = ({
    teams,
    isLoading,
    setSearchPlayer,
    setCurrTeams,
    currTeams,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const searchContentRef = useRef<HTMLDivElement>(null)
    const teamButtonRef = useRef<HTMLButtonElement>(null)

    const handleTeamSelect = (team: Team | null) => {
        setCurrTeams(team)
        setIsOpen(false)
        setSearchValue('') // Очищаем строку поиска команд при закрытии
    }

    // Фильтруем команды на лету без useEffect и лишних стейтов
    const filteredTeams = useMemo(() => {
        const cleanQuery = searchValue.trim().toLowerCase()
        if (!cleanQuery) return teams

        return teams.filter((team) =>
            team.name?.trim().toLowerCase().includes(cleanQuery),
        )
    }, [searchValue, teams])

    // Закрытие выпадающего списка при клике снаружи
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            const clickedInsideContent =
                searchContentRef.current?.contains(target)
            const clickedInsideButton = teamButtonRef.current?.contains(target)

            if (!clickedInsideContent && !clickedInsideButton) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <section className={styles.search}>
            <div className={styles.search__flex}>
                <label htmlFor="player-search" className={styles.search__text}>
                    Поиск:
                </label>
                <input
                    id="player-search"
                    type="text"
                    placeholder="Ник игрока"
                    className={styles.search__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchPlayer(e.target.value)
                    }
                />
                <button
                    type="button"
                    ref={teamButtonRef}
                    className={`${styles.team__button} ${currTeams ? styles.team__button_active : ''}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                    title="Фильтр по команде"
                >
                    {currTeams ? (
                        <img
                            src={currTeams.logo_url}
                            alt={currTeams.tag}
                            className={styles.team__buttonImg}
                        />
                    ) : (
                        '?'
                    )}
                </button>
            </div>

            {isOpen && (
                <div className={styles.search__content} ref={searchContentRef}>
                    <input
                        type="text"
                        value={searchValue}
                        placeholder="Поиск команды..."
                        className={styles.team__input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchValue(e.target.value)
                        }
                    />

                    <ul className={styles.team__list}>
                        {/* Кнопка сброса теперь находится внутри валидного тега li */}
                        <li className={styles.list__item}>
                            <button
                                type="button"
                                className={styles.team__selectButton}
                                onClick={() => handleTeamSelect(null)}
                                title="Все команды"
                            >
                                Все
                            </button>
                        </li>

                        {isLoading ? (
                            <div className={styles.spinner_container}>
                                <Spinner />
                            </div>
                        ) : (
                            filteredTeams.map((team) => (
                                <li
                                    className={styles.list__item}
                                    key={team.team_id}
                                >
                                    <button
                                        type="button"
                                        className={styles.team__selectButton}
                                        onClick={() => handleTeamSelect(team)}
                                        title={team.name}
                                    >
                                        <img
                                            className={styles.team__img}
                                            src={team.logo_url}
                                            alt={team.tag}
                                        />
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default SearchPro
