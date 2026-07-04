import React, { useState, type FC, type PropsWithChildren } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setError } from '../../store/player/playerSlice'
import Spinner from '../../UI/Spinner/Spinner'

import dotaLogo from '../../assets/dota-logo.svg'
import searchImg from '../../assets/search.svg'
import styles from './SearchLayout.module.css'

interface SearchLayoutProps {
    placeholder?: string
    buttonText?: string
    isLoading?: boolean
    onSearchSubmit: (value: string) => Promise<void> | void
}

const SearchLayout: FC<PropsWithChildren<SearchLayoutProps>> = ({
    placeholder = 'Найти...',
    buttonText = 'Найти',
    isLoading = false,
    onSearchSubmit,
    children,
}) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const error = useAppSelector((state) => state.player.error)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        if (error) dispatch(setError(null))
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmedValue = searchValue.trim()

        if (!trimmedValue || isLoading) return

        await onSearchSubmit(trimmedValue)
    }

    const isButtonDisabled = !searchValue.trim() || isLoading

    return (
        <section className={styles.search}>
            <div className={styles.search__logo}>
                <h1>DOTA STATS</h1>
                <img src={dotaLogo} alt="Dota 2 Logo" />
            </div>

            <form className={styles.search__form} onSubmit={handleFormSubmit}>
                <div
                    className={`${styles.search__fieldWrapper} ${isLoading ? styles.search__fieldWrapper_disabled : ''}`}
                >
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchValue}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className={styles.search__input}
                    />
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                        className={styles.search__iconButton}
                        aria-label="Поиск"
                    >
                        <img src={searchImg} alt="" />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={styles.search__submitButton}
                >
                    {isLoading ? (
                        <div className={styles.btn__spinner}>
                            <Spinner width={70} />
                        </div>
                    ) : (
                        buttonText
                    )}
                </button>

                {error && (
                    <div className={styles.error} role="alert">
                        {error}
                    </div>
                )}
            </form>

            {children && (
                <div className={styles.search__children}>{children}</div>
            )}
        </section>
    )
}

export default SearchLayout
