import { heroData } from '../data/heroData'
import { medalsConfig, unrankedMedal, type MedalInfo } from '../data/medalsData'

export const secondsToHMS = (seconds: number | undefined): string => {
    if (seconds === undefined || seconds < 0) return '00:00'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const pad = (num: number) => String(num).padStart(2, '0')

    const hoursStr = hours > 0 ? `${hours}:` : ''
    const minutesStr = hours > 0 ? `${pad(minutes)}:` : `${minutes}:`
    const secondsStr = pad(remainingSeconds)

    return `${hoursStr}${minutesStr}${secondsStr}`
}

export const getHeroName = (heroId: number): string => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.name || 'Unknown Hero'
}

export const getHeroImage = (heroId: number): string => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.img || ''
}

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
