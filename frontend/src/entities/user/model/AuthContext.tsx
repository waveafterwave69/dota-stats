import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface User {
    steamId64: string
    username: string
    avatar: string
    avatarfull?: string
    profileUrl?: string
    dotaData?: any
}

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    loading: boolean
    login: (token: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const login = async (token: string) => {
        try {
            console.log('🔐 Login started')

            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            const response = await axios.get(`${API_URL}/dota/profile`)

            console.log('✅ User data received:', response.data)

            setUser({
                steamId64: response.data.steamId64,
                username: response.data.username || 'Игрок',
                avatar: response.data.avatar || '',
                avatarfull: response.data.avatarfull || '',
                profileUrl: response.data.profileUrl || '',
                dotaData: response.data.dotaData,
            })
        } catch (error) {
            console.error('❌ Login error:', error)
            logout()
            throw error
        }
    }

    const logout = () => {
        console.log('🔓 Logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setUser(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            login(token)
                .catch(() => logout())
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
