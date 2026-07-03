import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import BurgerMenu from '../BurgerMenu/BurgerMenu'
import { useAppSelector } from '../../hooks/hooks'

import dotaLogo from '../../assets/dota-logo.svg'
import favoritesImg from '../../assets/favoritesImg.png'
import styles from './Header.module.css'

const NAV_ITEMS = [
    { path: '/', label: 'Игроки' },
    { path: '/searchMatches', label: 'Матчи' },
    { path: '/pro', label: 'Про-Игроки' },
]

const Header: React.FC = () => {
    const location = useLocation()
    const favorites = useAppSelector((state) => state.favorites.favorites)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            {isMenuOpen && (
                <div className={styles.overlay} onClick={closeMenu} />
            )}

            <header className={styles.header}>
                {!isMenuOpen && (
                    <>
                        <div className={styles.header__content}>
                            <Link
                                to="/"
                                className={styles.header__logo}
                                onClick={closeMenu}
                            >
                                <p>DOTA STATS</p>
                                <img src={dotaLogo} alt="dota2" />
                            </Link>

                            <nav className={styles.nav}>
                                {NAV_ITEMS.map((item) => {
                                    const isActive =
                                        location.pathname === item.path
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`${styles.header__item} ${isActive ? styles.header__item_active : ''}`}
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>

                        <Link to="/favorites" className={styles.fav}>
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
