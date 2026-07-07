import React from 'react'

const LoginButton: React.FC = () => {
    const handleLogin = () => {
        const BACKEND_URL =
            import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
        window.location.href = `${BACKEND_URL}/api/auth/steam`
    }

    return (
        <button
            onClick={handleLogin}
            style={{
                backgroundColor: '#1b2838',
                color: 'white',
                border: '1px solid #2a475e',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a475e'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1b2838'
            }}
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0Z"
                    fill="#66C0F4"
                />
                <path
                    d="M8 2.5C4.96 2.5 2.5 4.96 2.5 8C2.5 11.04 4.96 13.5 8 13.5C11.04 13.5 13.5 11.04 13.5 8C13.5 4.96 11.04 2.5 8 2.5Z"
                    fill="#1B2838"
                />
                <path
                    d="M10.5 7.5L8 6L5.5 7.5V11L8 12.5L10.5 11V7.5Z"
                    fill="white"
                />
            </svg>
            Войти через Steam
        </button>
    )
}

export default LoginButton
