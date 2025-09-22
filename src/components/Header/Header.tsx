import styles from './Header.module.css'

import dotaLogo from '../../assets/dota-logo.svg'
import { Link } from 'react-router'

const Header: React.FC = () => {
    return (
        <>
            <header className={styles.header}>
                <div className="container">
                    <Link to={'/'} className={styles.header__logo}>
                        <span>DOTA STATS</span>
                        <img src={dotaLogo} alt="dota2" />
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header
