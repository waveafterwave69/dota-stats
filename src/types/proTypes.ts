export interface Team {
    team_id: number
    wins: number
    rating: number
    losses: number
    name: string
    tag: string
    logo_url: string
}

export interface ProPlayer {
    account_id: number
    avatar: string
    avatarfull: string
    avatarmedium: string
    country_code: string
    loccountrycode: string
    name: string
    personaname: string
    profileurl: string
    steamid: string
    team_id: number
    team_name: string
    team_tag: string
}
