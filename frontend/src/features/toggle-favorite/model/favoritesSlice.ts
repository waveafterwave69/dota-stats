import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { FavoritesState } from '@/app/providers/store/types'
import { PlayerProfile } from '@/entities/player/model/types'

export const LOCAL_STORAGE_KEY_FAV = 'favoritesPlayers'

const loadState = (): PlayerProfile[] => {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY_FAV)
        if (data === null) return []
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
        return []
    }
}

const initialState: FavoritesState = {
    favorites: loadState(),
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (
            state,
            action: PayloadAction<PlayerProfile | undefined>,
        ) => {
            if (action.payload) {
                state.favorites.push(action.payload)
            }
        },
        deleteFavorites: (state, action: PayloadAction<PlayerProfile>) => {
            if (action.payload) {
                state.favorites = state.favorites.filter(
                    (player) => player.account_id !== action.payload.account_id,
                )
            }
        },
    },
})

export const { addFavorites, deleteFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
