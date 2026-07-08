import { PAGES } from '@/app/routes/pages'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const AuthError: React.FC = () => {
    const location = useLocation()
    const error = location.state?.error || 'unknown_error'

    const errorMessages: Record<string, string> = {
        no_identity: 'Steam не вернул идентификатор пользователя',
        cancelled: 'Вы отменили вход через Steam',
        invalid_steam_id: 'Получен неверный Steam ID',
        api_key_missing: 'Ошибка конфигурации сервера',
        player_not_found: 'Пользователь не найден в Steam',
        unknown_error: 'Произошла неизвестная ошибка',
        no_token: 'Токен не найден',
        login_failed: 'Не удалось войти',
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                padding: '20px',
            }}
        >
            <h1>❌ Ошибка авторизации</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                {errorMessages[error] || 'Неизвестная ошибка'}
            </p>
            <Link
                to={PAGES.SEARCH}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                Вернуться на главную
            </Link>
        </div>
    )
}

export default AuthError
