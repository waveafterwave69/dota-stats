import { openDotaApi } from '@/shared/api/base'
import axios from 'axios'

export const getTeams = async () => {
    try {
        const response = await openDotaApi.get(`/teams`)

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        response.data.length = 100

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

export const getPro = async () => {
    try {
        const response = await openDotaApi.get(`/proPlayers`)

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
