import styles from './Header.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

const Header: React.FC = () => {
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
