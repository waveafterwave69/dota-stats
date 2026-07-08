import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/entities/user/model/AuthContext'
import { UserProfile } from '@/features/user-profile/UserProfile'
import { LoginButton } from '@/features/auth-by-steam'
import styles from './BurgerMenu.module.css'
import burgerImg from '@/shared/assets/burgerImg.png'
import { useEffect } from 'react'

interface BurgerMenuProps {
    setIsMenuOpen: (menu: boolean) => void
    isMenuOpen: boolean
}

const NAV_ITEMS = [
    { path: '/', label: 'Игроки' },
    { path: '/searchMatches', label: 'Матчи' },
    { path: '/pro', label: 'Про-Игроки' },
]

const BurgerMenu: React.FC<BurgerMenuProps> = ({
    setIsMenuOpen,
    isMenuOpen,
}) => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const renderIcon = (path: string) => {
        switch (path) {
            case '/':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                )
            case '/searchMatches':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="14.5" y1="17.5" x2="3" y2="6" />
                        <line x1="13" y1="3.5" x2="21" y2="11.5" />
                        <line x1="21" y1="3" x2="12.5" y2="11.5" />
                        <line x1="3" y1="21" x2="6.5" y2="17.5" />
                    </svg>
                )
            case '/pro':
                return (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.burgerContainer}>
            <button
                className={styles.burger__button}
                onClick={handleToggleMenu}
                aria-label="Открыть меню"
            >
                <img
                    src={burgerImg}
                    alt="открыть"
                    className={styles.burger__img}
                />
            </button>

            <div
                className={`${
                    isMenuOpen ? styles.burger__open : styles.burger__close
                }`}
                onClick={handleToggleMenu}
            >
                <div
                    className={styles.burger__menu}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={handleToggleMenu}
                        className={styles.burger__close__button}
                        aria-label="Закрыть меню"
                    >
                        <svg
                            className={styles.burger__close__svg}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://w3.org"
                        >
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div className={styles.burger__auth}>
                        {loading ? (
                            <span className={styles.burger__loadingText}>
                                Проверка...
                            </span>
                        ) : !isAuthenticated ? (
                            <div
                                className={styles.steamBtnWrapper}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LoginButton />
                            </div>
                        ) : (
                            <UserProfile />
                        )}
                    </div>

                    <div className={styles.burger__divider} />

                    {/* Блок «Искать: категории» */}
                    <div className={styles.burger__searchTitle}>Искать:</div>

                    <nav className={styles.burger__navigation}>
                        <Link
                            to="/favorites"
                            className={`${styles.burger__item} ${
                                location.pathname === '/favorites'
                                    ? styles.burger__item_active
                                    : ''
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        ></Link>

                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.burger__item} ${
                                    location.pathname === item.path
                                        ? styles.burger__item_active
                                        : ''
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className={styles.burger__itemContent}>
                                    {renderIcon(item.path)}
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default BurgerMenu
