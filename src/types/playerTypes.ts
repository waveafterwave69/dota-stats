export interface PlayerProfile {
    personaname: string
    avatarfull: string
    loccountrycode: string
    account_id: number
}

export interface PlayerInfo {
    profile: PlayerProfile
    rank_tier: number | null
    computed_rating: number
    account_id: number
}

export interface WinLose {
    win: number
    lose: number
}

export interface PlayerHeroesI {
    games: number
    hero_id: number
    last_played: number
    win: number
}
