import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/entities/user/model/AuthContext'
import { Spinner } from '@/shared/ui'

const AuthCallback = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    useEffect(() => {
        console.log('📱 AuthCallback mounted')
        console.log('Location hash:', location.hash)

        const hash = location.hash
        if (hash && hash.startsWith('#token=')) {
            const token = hash.substring(7)
            console.log('✅ Token found in hash')

            if (token) {
                login(token)
                    .then(() => {
                        console.log('✅ Login successful, navigating to home')
                        navigate('/')
                    })
                    .catch((error) => {
                        console.error('❌ Login failed:', error)
                        navigate('/auth/error', {
                            state: { error: 'login_failed' },
                        })
                    })
                return
            }
        }

        const searchParams = new URLSearchParams(location.search)
        const error = searchParams.get('message')
        if (error) {
            console.log('❌ Error parameter found:', error)
            navigate('/auth/error', { state: { error } })
            return
        }

        console.log('❌ No token or error found')
        navigate('/auth/error', { state: { error: 'no_token' } })
    }, [location, navigate, login])

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <Spinner width={100} />
        </div>
    )
}

export default AuthCallback
