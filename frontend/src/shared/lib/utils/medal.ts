import { medalsConfig, unrankedMedal } from '@/entities/medal/model/constants'
import { MedalInfo } from '@/entities/medal/model/types'

export const getMedal = (
    tier: number | null | undefined,
    leaderboardRank?: number | null,
): MedalInfo => {
    if (!tier || tier === 0) return unrankedMedal

    const tierGroup = Math.floor(tier / 10)

    const starLevel = tier % 10

    const group = medalsConfig[tierGroup]
    if (!group) return unrankedMedal

    const foundMedal = group[starLevel]
    if (!foundMedal) return unrankedMedal

    if (tierGroup === 8 && leaderboardRank) {
        return {
            ...foundMedal,
            name: `Титан #${leaderboardRank}`,
        }
    }

    return foundMedal
}
