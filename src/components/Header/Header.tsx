import styles from './Header.module.css'

import dotaLogo from '../../assets/dota-logo.svg'
import { Link } from 'react-router'

const Header: React.FC = () => {
    return (
        <>
            <div className="container">
                <header className={styles.header}>
                    <Link to={'/'} className={styles.header__logo}>
                        <p>DOTA STATS</p>
                        <img src={dotaLogo} alt="dota2" />
                    </Link>
                </header>
            </div>
        </>
    )
}

export default Header
