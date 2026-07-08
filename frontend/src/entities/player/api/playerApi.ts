import { openDotaApi } from '@/shared/api/base'
import axios from 'axios'

export const getPlayerInfo = async (playerId: string) => {
    try {
        const response = await openDotaApi.get(`/players/${playerId}`)

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
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
}

export const getWinAndLose = async (playerId: number | undefined) => {
    if (!playerId) return { win: 0, lose: 0 }

    try {
        const response = await openDotaApi.get(
            `/players/${playerId}/wl?significant=0`,
        )

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
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
}

export const getPlayerHeroes = async (playerId: string | undefined) => {
    try {
        const response = await openDotaApi.get(`/players/${playerId}/heroes`)

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
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
}
