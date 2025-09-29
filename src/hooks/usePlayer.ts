import { useContext } from 'react'
import type { PlayerInfo } from '../types/playerTypes'
import { PlayerContext } from '../context/PlayerContext'

interface PlayerContextValue {
    playerInfo: PlayerInfo | null
    loading: boolean
    error: string | null
    getPlayerInfo: (playerId: string) => Promise<any>
    setError: (err: string) => void
    winLose: number | null
    setWinLose: (winLose: 1 | 0 | null) => void
}

const usePlayer = (): PlayerContextValue => {
    const context = useContext(PlayerContext)
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider')
    }
    return context
}

export default usePlayer
