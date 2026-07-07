import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/app/providers/store/types'
import { getWinAndLose } from '@/entities/player/api/playerApi'
import { WinLose } from '@/entities/player/model/types'
import { MedalInfo } from '../model/types'
import { medalsConfig, unrankedMedal } from '../model/constants'
import { fetchPlayerInfo } from '@/entities/player/model/playerSlice'

interface Profile {
    personaname: string
    avatarfull: string
    loccountrycode: string
    account_id: number
}

interface FetchError {
    message: string
}

interface PlayerContextValue {
    profile: Profile | undefined
    rankMedal: string
    rankName: string
    winRate: number | undefined
    winLose: WinLose | undefined
    loading: boolean
    error: string | null
}

const useRank = (): PlayerContextValue => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()

    const playerInfo = useAppSelector((state) => state.player.playerInfo)
    const [winLose, setWinLose] = useState<WinLose | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const profile = playerInfo?.profile
    const rankTier = playerInfo?.rank_tier
    const leaderboardRank = playerInfo?.leaderboard_rank

    useEffect(() => {
        if (!id) {
            setLoading(false)
            setError('ID игрока не указан')
            return
        }

        if (!/^\d+$/.test(id)) {
            setLoading(false)
            setError('Неверный формат ID игрока')
            return
        }

        const loadPlayer = async () => {
            try {
                setLoading(true)
                setError(null)

                console.log('📡 Fetching player data for ID:', id)

                if (playerInfo?.profile?.account_id === Number(id)) {
                    console.log('✅ Player already loaded')
                    setLoading(false)
                    return
                }

                await dispatch(fetchPlayerInfo(id)).unwrap()
                console.log('✅ Player data loaded')
            } catch (err) {
                const error = err as FetchError
                console.error('❌ Error loading player:', error)
                setError(error.message || 'Ошибка загрузки данных игрока')
            } finally {
                setLoading(false)
            }
        }

        loadPlayer()
    }, [id, dispatch, playerInfo?.profile?.account_id])

    useEffect(() => {
        if (!profile?.account_id) {
            setWinLose(undefined)
            return
        }

        setWinLose(undefined)

        const fetchWinLoseData = async () => {
            try {
                const data = await getWinAndLose(profile.account_id)
                setWinLose(data)
            } catch (err) {
                const error = err as FetchError
                console.error('Не удалось загрузить статистику матчей:', error)
            }
        }

        fetchWinLoseData()
    }, [profile?.account_id])

    const medalInfo = useMemo<MedalInfo>(() => {
        if (!rankTier) return unrankedMedal

        const tierGroup = Math.floor(rankTier / 10)
        const starLevel = rankTier % 10

        const foundMedal = medalsConfig[tierGroup]?.[starLevel]

        if (!foundMedal) return unrankedMedal

        if (tierGroup === 8 && leaderboardRank) {
            return {
                ...foundMedal,
                name: `Титан #${leaderboardRank}`,
            }
        }

        return foundMedal
    }, [rankTier, leaderboardRank])

    const winRate = useMemo<number | undefined>(() => {
        if (!winLose || (winLose.win === 0 && winLose.lose === 0))
            return undefined

        const totalMatches = winLose.win + winLose.lose
        const rate = (winLose.win / totalMatches) * 100

        return Number(rate.toFixed(2))
    }, [winLose])

    return {
        profile,
        rankMedal: medalInfo.img,
        rankName: medalInfo.name,
        winRate,
        winLose,
        loading,
        error,
    }
}

export default useRank
