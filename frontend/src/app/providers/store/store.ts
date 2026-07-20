import { configureStore, Middleware } from '@reduxjs/toolkit'

import { playerReducer } from '@/entities/player/model/playerSlice'
import {
    favoritesReducer,
    LOCAL_STORAGE_KEY_FAV,
} from '@/features/toggle-favorite/model/favoritesSlice'

const favoritesLocalStorageMiddleware: Middleware =
    (storeApi) => (next) => (action) => {
        const result = next(action)

        if (
            typeof action === 'object' &&
            action !== null &&
            'type' in action &&
            typeof action.type === 'string' &&
            action.type.startsWith('favorites/')
        ) {
            try {
                const state = storeApi.getState() as RootState
                const { favorites } = state.favorites
                localStorage.setItem(
                    LOCAL_STORAGE_KEY_FAV,
                    JSON.stringify(favorites),
                )
            } catch (err) {
                console.error(
                    'Не удалось сохранить список избранных игроков:',
                    err,
                )
            }
        }

        return result
    }

export const store = configureStore({
    reducer: {
        player: playerReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(favoritesLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
