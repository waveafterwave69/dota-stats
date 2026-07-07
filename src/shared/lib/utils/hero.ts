import { heroData } from '@/entities/hero'

export const getHeroName = (heroId: number): string => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.name || 'Unknown Hero'
}

export const getHeroImage = (heroId: number): string => {
    const currHero = heroData.find((hero) => hero.id === heroId)
    return currHero?.img || ''
}
