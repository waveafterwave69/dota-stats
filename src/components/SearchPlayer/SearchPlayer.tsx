import styles from './SearchPlayer.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import searchImg from '../../assets/search.svg'
import { useState } from 'react'
import usePlayer from '../../hooks/usePlayer'
import { useNavigate } from 'react-router'

const SearchPlayer: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const { getPlayerInfo, error, setError } = usePlayer()
    const navigate = useNavigate()

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        if (!/^\d+$/.test(searchValue)) {
            setError('Пожалуйста, введите числовой Steam ID.')
            return
        }

        const success = await getPlayerInfo(searchValue)

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

export default SearchPlayer
