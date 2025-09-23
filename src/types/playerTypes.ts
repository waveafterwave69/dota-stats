export interface PlayerInfo {
    profile: {
        personaname: string
        avatarfull: string
        loccountrycode: string
        account_id: number
    }
    rank_tier: number | null
    computed_rating: number
    account_id: number
}

export interface WinLose {
    win: number
    lose: number
}
