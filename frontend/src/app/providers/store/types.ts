import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from './store'
import { PlayerInfo, PlayerProfile } from '@/entities/player/model/types'

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
}
