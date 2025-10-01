import { useEffect, useState, useRef } from 'react'
import type { Team } from '../../types/proTypes'
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
    const [team, setTeam] = useState<Team[]>(teams)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const searchContentRef = useRef<HTMLDivElement>(null)
    const teamButtonRef = useRef<HTMLButtonElement>(null)

    const handleTeam = (team: Team | null) => {
        setCurrTeams(team)
        setIsOpen(false)
    }

    useEffect(() => {
        setTeam(teams)
    }, [teams])

    const teamFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if (searchValue) {
            const needTeams = teams.filter((team) =>
                team.name
                    .trim()
                    .toLocaleLowerCase()
                    .includes(searchValue.trim().toLocaleLowerCase())
            )

            setTeam(needTeams)
        } else {
            setTeam(teams)
        }
    }, [searchValue, teams])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContentRef.current &&
                !searchContentRef.current.contains(event.target as Node) &&
                teamButtonRef.current &&
                !teamButtonRef.current.contains(event.target as Node)
            ) {
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
        <>
            <section className={styles.search}>
                <div className={styles.search__flex}>
                    <span className={styles.search__text}>поиск:</span>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchPlayer(e.target.value)
                        }
                        type="text"
                        placeholder="ник игрока"
                        className={styles.search__input}
                    />
                    <button
                        className={styles.team__button}
                        onClick={() => setIsOpen((prev) => !prev)}
                        ref={teamButtonRef}
                    >
                        {currTeams ? (
                            <img src={currTeams.logo_url} alt={currTeams.tag} />
                        ) : (
                            <p>?</p>
                        )}
                    </button>
                </div>
                {isOpen && (
                    <div
                        className={styles.search__content}
                        ref={searchContentRef}
                    >
                        <input
                            onChange={teamFilter}
                            type="text"
                            value={searchValue}
                            placeholder="команда"
                            className={styles.team__input}
                        />
                        <ul className={styles.team__list}>
                            <button
                                className={styles.list__item}
                                onClick={() => handleTeam(null)}
                            >
                                ?
                            </button>
                            {isLoading ? (
                                <p>Загрузка...</p>
                            ) : (
                                team.map((team) => (
                                    <li
                                        className={styles.list__item}
                                        key={team.team_id}
                                    >
                                        <button
                                            onClick={() => handleTeam(team)}
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
        </>
    )
}

export default SearchPro
