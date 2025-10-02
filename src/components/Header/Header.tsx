import styles from './Header.module.css'
import dotaLogo from '../../assets/dota-logo.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import burgerImg from '../../assets/burgerImg.png'
import burgerCloseImg from '../../assets/burgerCloseImg.png'

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

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

                <div className={styles.burger}>
                    <button
                        className={styles.burger__button}
                        onClick={toggleMenu}
                    >
                        <img
                            src={burgerImg}
                            alt="открыть"
                            className={styles.burger__img}
                        />
                    </button>
                    <div
                        className={`${
                            isMenuOpen
                                ? styles.burger__open
                                : styles.burger__close
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className={styles.burger__close__button}
                        >
                            <img
                                src={burgerCloseImg}
                                alt="закрыть"
                                className={`${styles.burger__img} ${styles.burger__close__img}`}
                            />
                        </button>
                        <nav className={styles.burger__menu}>
                            <Link
                                to="/"
                                className={styles.burger__item}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <p>Игроки</p>
                            </Link>
                            <Link
                                to="/searchMatches"
                                className={styles.burger__item}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <p>Матчи</p>
                            </Link>
                            <Link
                                to="/pro"
                                className={styles.burger__item}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <p>Про-Игроки</p>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
