import { configureStore } from '@reduxjs/toolkit'
import { playerReducer } from './player/playerSlice'
import { favoritesReducer } from './favorites/favoritesSlice'

export const store = configureStore({
    reducer: {
        player: playerReducer,
        favorites: favoritesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
