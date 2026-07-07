import { Link } from 'react-router'

import styles from './BurgerMenu.module.css'

import burgerImg from '@/shared/assets/burgerImg.png'
import burgerCloseImg from '@/shared/assets/burgerCloseImg.png'

interface BurgerMenuProps {
    setIsMenuOpen: (menu: boolean) => void
    isMenuOpen: boolean
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
    setIsMenuOpen,
    isMenuOpen,
}) => {
    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <div className={styles.burger}>
                <button
                    className={styles.burger__button}
                    onClick={handleToggleMenu}
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
                >
                    <button
                        onClick={handleToggleMenu}
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
                            to="/favorites"
                            className={styles.burger__item}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <p>Избранные</p>
                        </Link>
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
        </>
    )
}

export default BurgerMenu
