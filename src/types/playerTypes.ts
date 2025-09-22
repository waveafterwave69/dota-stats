export interface PlayerInfo {
    profile: {
        personaname: string
        avatarfull: string
        loccountrycode: string
        account_id: number
    }
    rank_tier: number | null
}
