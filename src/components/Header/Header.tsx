import styles from './Header.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import favoritesImg from '../../assets/favoritesImg.png'
import { useAppSelector } from '../../hooks/hooks'

const Header: React.FC = () => {
    const favorites = useAppSelector((state) => state.favorites.favorites)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            {isMenuOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            <header className={styles.header}>
                {!isMenuOpen && (
                    <>
                        <div className={styles.header__content}>
                            <Link to="/" className={styles.header__logo}>
                                <p>DOTA STATS</p>
                                <img src={dotaLogo} alt="dota2" />
                            </Link>
                            <nav className={styles.nav}>
                                <Link
                                    to="/"
                                    className={styles.header__item}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <p>Игроки</p>
                                </Link>
                                <Link
                                    to="/searchMatches"
                                    className={styles.header__item}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <p>Матчи</p>
                                </Link>
                                <Link
                                    to="/pro"
                                    className={styles.header__item}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <p>Про-Игроки</p>
                                </Link>
                            </nav>
                        </div>
                        <Link to={`/favorites`} className={styles.fav}>
                            <img
                                src={favoritesImg}
                                alt="избранные"
                                className={styles.fav__img}
                            />
                            {favorites.length > 0 && (
                                <span>{favorites.length}</span>
                            )}
                        </Link>
                    </>
                )}
                <BurgerMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
            </header>
        </>
    )
}

export default Header
