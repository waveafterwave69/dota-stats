import { configureStore } from '@reduxjs/toolkit'

import { playerReducer } from '@/entities/player/model/playerSlice'
import { favoritesReducer } from '@/features/toggle-favorite/model/favoritesSlice'

export const store = configureStore({
    reducer: {
        player: playerReducer,
        favorites: favoritesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
