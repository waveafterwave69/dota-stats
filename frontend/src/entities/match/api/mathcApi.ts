import { openDotaApi } from '@/shared/api/base'
import axios from 'axios'

export const getAllMatches = async (
    playerId: string | undefined,
    limit: number = 20,
    win: number | null = null,
) => {
    try {
        if (win != null) {
            const response = await openDotaApi.get(
                `/players/${playerId}/matches?limit=${limit}&win=${win}&significant=0`,
            )

            return response.data
        }
        const response = await openDotaApi.get(
            `/players/${playerId}/matches?limit=${limit}&significant=0`,
        )

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

export const getMatches = async (playerId: string | undefined) => {
    try {
        const response = await openDotaApi.get(
            `/players/${playerId}/recentMatches`,
        )

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

export const getOneMatch = async (matchId: string | undefined) => {
    try {
        const response = await openDotaApi.get(`/matches/${matchId}`)

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
