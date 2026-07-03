import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchPlayerInfo, setError } from '../../store/player/playerSlice'

import dotaLogo from '../../assets/dota-logo.svg'
import searchImg from '../../assets/search.svg'
import styles from './SearchPage.module.css'

const SearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const error = useAppSelector((state) => state.player.error)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        if (error) dispatch(setError(null))
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const trimmedValue = searchValue.trim()

        if (!/^\d+$/.test(trimmedValue)) {
            dispatch(setError('Пожалуйста, введите числовой Steam ID.'))
            return
        }

        const success = await dispatch(fetchPlayerInfo(trimmedValue))
        if (success) {
            navigate(`/player/${trimmedValue}`)
        }
    }

    return (
        <section className={styles.search}>
            <div className={styles.search__logo}>
                <h1>DOTA STATS</h1>
                <img src={dotaLogo} alt="Dota 2 Logo" />
            </div>

            <form className={styles.search__form} onSubmit={handleFormSubmit}>
                <div className={styles.search__fieldWrapper}>
                    <input
                        type="text"
                        placeholder="Найти игрока (Steam ID)"
                        value={searchValue}
                        onChange={handleInputChange}
                        className={styles.search__input}
                    />
                    <button
                        type="submit"
                        className={styles.search__iconButton}
                        aria-label="Поиск"
                    >
                        <img src={searchImg} alt="" />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!searchValue.trim()}
                    className={styles.search__submitButton}
                >
                    Найти
                </button>

                {error && (
                    <div className={styles.error} role="alert">
                        {error}
                    </div>
                )}
            </form>
        </section>
    )
}

export default SearchPage
