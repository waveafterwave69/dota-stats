import styles from './LoginButton.module.css'

import steamIcon from '@/shared/assets/steam-icon.webp'

const LoginButton: React.FC = () => {
    const handleLogin = () => {
        const BACKEND_URL =
            import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
        window.location.href = `${BACKEND_URL}/api/auth/steam`
    }

    return (
        <button className={styles.button} onClick={handleLogin}>
            <p className={styles.button__text}>Войти</p>
            <img className={styles.button__img} src={steamIcon} alt="Steam" />
        </button>
    )
}

export default LoginButton
