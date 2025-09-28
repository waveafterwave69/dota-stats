import { heroData } from '../data/heroData'
import { medals, unrankedMedal } from '../data/medalsData'

export const secondsToHMS = (seconds: number | undefined): string => {
    if (seconds === undefined) return 'N/A'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const hoursStr = hours > 0 ? `${hours}:` : ''
    const minutesStr = minutes > 0 ? `${minutes}:` : ''
    const secondsStr = remainingSeconds > 0 ? `${remainingSeconds}` : ''

    return `${hoursStr}${minutesStr}${secondsStr}`
}

export const getHeroName = (heroId: number) => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.name
}

export const getHeroImage = (heroId: number) => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.img
}

export const getMedal = (tier: number | null) => {
    if (tier === null) return unrankedMedal
    const tierNum = Math.floor(tier / 10) - 1
    const starNum = Math.floor(tier % 10)
    return medals[tierNum]?.[starNum] || unrankedMedal
}
