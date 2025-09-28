export interface MatchData {
    match_id: number
    radiant_win: boolean
    kills: number
    deaths: number
    assists: number
    game_mode: number
    hero_id: number
    average_rank: number | null
}

export interface Player {
    item_0: number
    item_1: number
    item_2: number
    item_3: number
    item_4: number
    item_5: number
    personaname: string
    player_slot: string
    isRadiant: boolean
    account_id: number
    hero_id: number
    kills: number
    deaths: number
    assists: number
    last_hits: number
    denies: number
    gold_per_min: number
    net_worth: number
    xp_per_min: number
}

export interface OneMatch {
    players: Player[]
    radiant_score: number
    dire_score: number
    duration: number
    match_id: number
    radiant_win: boolean
    kills: number
    deaths: number
    assists: number
    game_mode: number
    hero_id: number
    average_rank: number | null
    match_seq_num: number
}
