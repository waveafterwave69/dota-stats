import React, { createContext, useState, type ReactNode } from 'react'
import axios from 'axios'
import type { PlayerInfo } from '../types/playerTypes'

interface PlayerContextValue {
    playerInfo: PlayerInfo | null
    loading: boolean
    error: string | null
    getPlayerInfo: (playerId: string) => Promise<any>
    setError: (err: string) => void
}

export const PlayerContext = createContext<PlayerContextValue | null>(null)

interface PlayerProviderProps {
    children: ReactNode
}

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getPlayerInfo = async (playerId: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get<PlayerInfo>(
                `https://api.opendota.com/api/players/${playerId}`
            )

            console.log(response)

            if (response.status !== 200) {
                throw new Error('Аккаунт не найден!')
            }

            setPlayerInfo(response.data)
            return response
        } catch (error: any) {
            console.error(error.message)
            setError('Аккаунт не найден!')
        } finally {
            setLoading(false)
        }
    }

    const playerValue: PlayerContextValue = {
        playerInfo,
        loading,
        error,
        getPlayerInfo,
        setError,
    }

    return (
        <PlayerContext.Provider value={playerValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider
