import { useEffect, useState, useMemo } from 'react'

import { useAppSelector } from '@/app/providers/store/types'
import { getWinAndLose } from '@/entities/player/api/playerApi'
import { WinLose } from '@/entities/player/model/types'
import { MedalInfo } from '../model/types'
import { medalsConfig, unrankedMedal } from '../model/constants'

interface PlayerContextValue {
    profile:
        | {
              personaname: string
              avatarfull: string
              loccountrycode: string
              account_id: number
          }
        | undefined
    rankMedal: string
    rankName: string
    winRate: number | undefined
    winLose: WinLose | undefined
}

const useRank = (): PlayerContextValue => {
    const playerInfo = useAppSelector((state) => state.player.playerInfo)
    const [winLose, setWinLose] = useState<WinLose | undefined>(undefined)

    const profile = playerInfo?.profile
    const rankTier = playerInfo?.rank_tier
    const leaderboardRank = playerInfo?.leaderboard_rank

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
            } catch (error) {
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
    }
}

export default useRank
