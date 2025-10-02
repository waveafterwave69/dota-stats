import styles from './SearchMatchesPage.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import searchImg from '../../assets/search.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getOneMatch } from '../../helpers/matchesHelpers'

const SearchMatchesPage: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const navigate = useNavigate()

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setError('')
    }

    const onSubmit = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()

        if (!/^\d+$/.test(searchValue)) {
            setError('Пожалуйста, введите числовой ID.')
            return
        }

        try {
            const data = await getOneMatch(searchValue)

            if (!data) {
                setError('Матч не найден.')
                return
            }

            navigate(`/match/${searchValue}`)
        } catch (err: any) {
            setError('Произошла ошибка при поиске матча.')
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
                            placeholder="найти матч(id)"
                            value={searchValue}
                            onChange={handleValue}
                        />
                        <button type="submit">
                            <img src={searchImg} alt="поиск" />
                        </button>
                    </div>
                    <button
                        disabled={searchValue.length < 1}
                        type="submit"
                        className={styles.search__button}
                    >
                        найти
                    </button>
                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </section>
        </>
    )
}

export default SearchMatchesPage
