import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/entities/user/model/AuthContext'
import styles from './Header.module.css'
import dotaLogo from '@/shared/assets/dota-logo.png'
import { UserProfile } from '@/features/user-profile/UserProfile'
import { LoginButton } from '@/features/auth-by-steam'
import BurgerMenu from '@/shared/ui/BurgerMenu/BurgerMenu'
import { PAGES } from '@/app/routes/pages'
import { NAV_ITEMS } from '@/app/routes/routesConfig'

const Header: React.FC = () => {
    const location = useLocation()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { isAuthenticated, loading } = useAuth()

    const currentItem =
        NAV_ITEMS.find((item) => item.path === location.pathname) ||
        NAV_ITEMS[0]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__main}>
                    <Link to={PAGES.SEARCH} className={styles.header__logo}>
                        <div className={styles.logoWrapper}>
                            <img
                                src={dotaLogo}
                                alt="dota2"
                                className={styles.logoImg}
                            />
                            <div className={styles.logoText}>
                                <span className={styles.logoText__dota}>
                                    DOTA
                                </span>
                                <p className={styles.logoText__stats}>STATS</p>
                            </div>
                        </div>
                    </Link>

                    <div className={styles.dropdownContainer} ref={dropdownRef}>
                        <button
                            className={`${styles.dropdownButton} ${
                                isDropdownOpen
                                    ? styles.dropdownButton_active
                                    : ''
                            }`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span>Искать: {currentItem.label}</span>
                            <svg
                                className={`${styles.arrow} ${
                                    isDropdownOpen ? styles.arrow_open : ''
                                }`}
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                            >
                                <path
                                    d="M1 1L6 6L11 1"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`${styles.dropdownLink} ${
                                            location.pathname === item.path
                                                ? styles.dropdownLink_active
                                                : ''
                                        }`}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.authBlock}>
                        {loading ? (
                            <span className={styles.loadingText}>
                                Проверка...
                            </span>
                        ) : !isAuthenticated ? (
                            <LoginButton />
                        ) : (
                            <UserProfile />
                        )}
                    </div>

                    <div className={styles.burger}>
                        <BurgerMenu
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
