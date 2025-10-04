import {
    createSlice,
    type PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'
import type { PlayerInfo } from '../../types/playerTypes'

interface PlayerState {
    playerInfo: PlayerInfo | null
    loading: boolean
    error: string | null
    winLose: number | null
}

const initialState: PlayerState = {
    playerInfo: null,
    loading: false,
    error: null,
    winLose: null,
}

export const fetchPlayerInfo = createAsyncThunk(
    'player/fetchPlayerInfo',
    async (playerId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<PlayerInfo>(
                `https://api.opendota.com/api/players/${playerId}`
            )

            if (response.status !== 200) {
                return rejectWithValue('Аккаунт не найден!')
            }

            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || 'Аккаунт не найден!'
            )
        }
    }
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
                }
            )
            .addCase(fetchPlayerInfo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.playerInfo = null
            })
    },
})

export const { setError, setWinLose } = playerSlice.actions
export const playerReducer = playerSlice.reducer
