import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PlayerProfile } from '../../types/playerTypes'

interface FavoritesState {
    favorites: PlayerProfile[]
}

const initialState: FavoritesState = {
    favorites: [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (
            state,
            action: PayloadAction<PlayerProfile | undefined>
        ) => {
            if (action.payload) {
                state.favorites.push(action.payload)
            }
        },
        deleteFavorites: (
            state,
            action: PayloadAction<PlayerProfile | any>
        ) => {
            if (action.payload) {
                const newFavorites = state.favorites.filter(
                    (player) => player.account_id !== action.payload.account_id
                )

                state.favorites = newFavorites
            }
        },
    },
})

export const { addFavorites, deleteFavorites } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
