import styles from './SearchPage.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import searchImg from '../../assets/search.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchPlayerInfo, setError } from '../../store/player/playerSlice'

const SearchPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const error = useAppSelector((state) => state.player.error)
    const navigate = useNavigate()

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onSubmit = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()

        if (!/^\d+$/.test(searchValue)) {
            dispatch(setError('Пожалуйста, введите числовой Steam ID.'))
            return
        }

        const success = await dispatch(fetchPlayerInfo(searchValue))

        if (success) {
            navigate(`/player/${searchValue}`)
        }
    }

    return (
        <>
            <section className={styles.search}>
                <div className={styles.search__logo}>
                    <h1>DOTA STATS</h1>
                    <img src={dotaLogo} alt="dota2" />
                </div>
                <form className={styles.search__form} onSubmit={onSubmit}>
                    <div className={styles.search__input}>
                        <input
                            type="text"
                            placeholder="найти игрока(steam id)"
                            value={searchValue}
                            onChange={handleValue}
                        />
                        <button type="button" onClick={onSubmit}>
                            <img src={searchImg} alt="поиск" />
                        </button>
                    </div>
                    <button
                        disabled={searchValue.length < 1}
                        type="button"
                        onClick={onSubmit}
                        className={styles.search__button}
                    >
                        найти
                    </button>
                    {error && <div className={styles.error}>{error}</div>}{' '}
                </form>
            </section>
        </>
    )
}

export default SearchPage
