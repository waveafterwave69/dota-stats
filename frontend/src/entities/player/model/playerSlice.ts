import {
    createSlice,
    type PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'

import { PlayerState } from '@/app/providers/store/types'
import { PlayerInfo } from './types'
import { openDotaApi } from '@/shared/api/base'
import { MatchData } from '@/entities/match/model/types'
import { PlayerHeroesI, WinLose } from '@/entities/player/model/types'

const initialState: PlayerState = {
    playerInfo: null,
    loading: false,
    error: null,
    winLose: null,
    winLoseData: null,
    cachedPlayerId: null,
    mainMatches: [],
    heroes: [],
    allMatches: [],
    currentLimit: 20,
}

export const fetchPlayerInfo = createAsyncThunk(
    'player/fetchPlayerInfo',
    async (playerId: string, { rejectWithValue }) => {
        try {
            const response = await openDotaApi.get<PlayerInfo>(
                `/players/${playerId}`,
            )

            console.log(response)

            if (response.status !== 200) {
                return rejectWithValue('Аккаунт не найден!')
            }

            return response.data
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(error.message)
                throw new Error(error.message)
            }

            if (error instanceof Error) {
                console.error(error.message)
                throw error
            }

            console.error('An unexpected error occurred')
            throw new Error('An unexpected error occurred')
        }
    },
)

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setWinLose: (state, action: PayloadAction<number | null>) => {
            state.winLose = action.payload
            state.allMatches = []
            state.currentLimit = 20
        },
        setWinLoseData: (state, action: PayloadAction<WinLose | null>) => {
            state.winLoseData = action.payload
        },
        setPlayerId: (state, action: PayloadAction<string>) => {
            if (state.cachedPlayerId !== action.payload) {
                state.cachedPlayerId = action.payload
                state.mainMatches = []
                state.heroes = []
                state.allMatches = []
                state.currentLimit = 20
                state.winLoseData = null
            }
        },
        setMainPageData: (
            state,
            action: PayloadAction<{
                matches: MatchData[]
                heroes: PlayerHeroesI[]
            }>,
        ) => {
            state.mainMatches = action.payload.matches
            state.heroes = action.payload.heroes
        },
        setAllMatchesData: (state, action: PayloadAction<MatchData[]>) => {
            state.allMatches = action.payload
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.currentLimit = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayerInfo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                fetchPlayerInfo.fulfilled,
                (state, action: PayloadAction<PlayerInfo>) => {
                    state.loading = false
                    state.playerInfo = action.payload

                    const newId = action.payload.profile?.account_id?.toString()
                    if (newId && state.cachedPlayerId !== newId) {
                        state.cachedPlayerId = newId
                        state.mainMatches = []
                        state.heroes = []
                        state.allMatches = []
                        state.currentLimit = 20
                        state.winLoseData = null
                    }
                },
            )
            .addCase(fetchPlayerInfo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.playerInfo = null
            })
    },
})

export const {
    setError,
    setWinLose,
    setWinLoseData,
    setPlayerId,
    setMainPageData,
    setAllMatchesData,
    setLimit,
} = playerSlice.actions

export const playerReducer = playerSlice.reducer
