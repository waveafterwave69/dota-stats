import type { WinLose } from '../types/playerTypes'
import { useEffect, useState } from 'react'
import usePlayer from './usePlayer'
import { getWinAndLose } from '../helpers/playerHelpers'
import { medals, unrankedMedal } from '../data/medalsData'

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
    const { playerInfo } = usePlayer()
    const [winLose, setWinLose] = useState<WinLose>()
    const [winRate, setWinRate] = useState<number>()
    const [tier, setTier] = useState<number>(0)
    const [stars, setStars] = useState<number>(0)
    const [rankMedal, setRankMedal] = useState<string>('')
    const [rankName, setRankName] = useState<string>('')

    const profile = playerInfo?.profile
    const rankTier: number | null | undefined = playerInfo?.rank_tier

    useEffect(() => {
        const winAndLose = async () => {
            const data = await getWinAndLose(profile?.account_id)

            setWinLose(data)
        }

        winAndLose()

        if (rankTier) {
            setTier(Math.floor(rankTier / 10) - 1)
            setStars(Math.floor(rankTier % 10))
        }
    }, [])

    useEffect(() => {
        if (tier === 0) {
            setRankName(unrankedMedal.name)
            setRankMedal(unrankedMedal.img)
        } else {
            setRankName(medals[tier][stars]?.name)
            setRankMedal(medals[tier][stars]?.img)
        }
    }, [tier, stars])

    useEffect(() => {
        if (winLose) {
            const currWinRate =
                (winLose.win / (winLose.win + winLose.lose)) * 100
            setWinRate(Number(String(currWinRate).slice(0, 5)))
        }
    }, [winLose])

    return {
        profile,
        rankMedal,
        rankName,
        winRate,
        winLose,
    }
}

export default useRank
