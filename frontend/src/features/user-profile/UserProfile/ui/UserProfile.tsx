import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/entities/user/model/AuthContext'
import styles from './UserProfile.module.css'

interface UserProfileProps {
    showLogout?: boolean
    onLogout?: () => void
    className?: string
}

const UserProfile: React.FC<UserProfileProps> = ({
    showLogout = true,
    onLogout,
    className = '',
}) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    if (!user) return null

    const handleProfileClick = () => {
        const dotaId = Number(
            BigInt(user.steamId64) - BigInt(76561197960265728),
        )
        navigate(`/player/${dotaId}`)
    }

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        } else {
            logout()
        }
    }

    return (
        <div className={`${styles.userContent} ${className}`}>
            <button className={styles.userProfile} onClick={handleProfileClick}>
                <img
                    src={user.avatar}
                    alt={user.username}
                    className={styles.userAvatar}
                    title="Перейти в профиль"
                />

                <span className={styles.userName} title="Перейти в профиль">
                    {user.username}
                </span>
            </button>

            {showLogout && (
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Выйти
                </button>
            )}
        </div>
    )
}

export default UserProfile
