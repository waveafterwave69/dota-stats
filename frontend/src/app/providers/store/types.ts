import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from './store'
import {
    PlayerHeroesI,
    PlayerInfo,
    PlayerProfile,
    WinLose,
} from '@/entities/player/model/types'
import { MatchData } from '@/entities/match/model/types'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface FavoritesState {
    favorites: PlayerProfile[]
}

export interface PlayerState {
    playerInfo: PlayerInfo | null
    loading: boolean
    error: string | null
    winLose: number | null
    winLoseData: WinLose | null
    cachedPlayerId: string | null
    mainMatches: MatchData[]
    heroes: PlayerHeroesI[]
    allMatches: MatchData[]
    currentLimit: number
}
