import axios from 'axios'

export const getPlayerInfo = async (playerId: string) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}`
        )

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getWinAndLose = async (playerId: number | undefined) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/wl`
        )

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getPlayerHeroes = async (playerId: number | undefined) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/heroes`
        )

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}
