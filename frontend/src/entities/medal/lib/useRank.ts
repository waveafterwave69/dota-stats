import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/app/providers/store/types'
import { getWinAndLose } from '@/entities/player/api/playerApi'
import { WinLose } from '@/entities/player/model/types'
import { MedalInfo } from '../model/types'
import { medalsConfig, unrankedMedal } from '../model/constants'
import {
    fetchPlayerInfo,
    setPlayerId,
    setWinLoseData,
} from '@/entities/player/model/playerSlice'

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
    const cachedPlayerId = useAppSelector(
        (state) => state.player.cachedPlayerId,
    )
    const winLose =
        useAppSelector((state) => state.player.winLoseData) || undefined

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

                if (
                    cachedPlayerId === id &&
                    playerInfo?.profile?.account_id === Number(id)
                ) {
                    setLoading(false)
                    return
                }

                dispatch(setPlayerId(id))
                await dispatch(fetchPlayerInfo(id)).unwrap()
            } catch (err) {
                const error = err as FetchError
                console.error('❌ Error loading player:', error)
                setError(error.message || 'Ошибка загрузки данных игрока')
            } finally {
                setLoading(false)
            }
        }

        loadPlayer()
    }, [id, dispatch, cachedPlayerId, playerInfo?.profile?.account_id])

    useEffect(() => {
        if (!profile?.account_id) return

        const accountIdStr = profile.account_id.toString()

        const fetchWinLoseData = async () => {
            try {
                const data = await getWinAndLose(profile.account_id)
                dispatch(setWinLoseData(data))
            } catch (err) {
                const error = err as FetchError
                console.error('Не удалось загрузить статистику матчей:', error)
            }
        }

        if (cachedPlayerId !== accountIdStr || !winLose) {
            fetchWinLoseData()
        }
    }, [profile?.account_id, cachedPlayerId, winLose, dispatch])

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
