import axios from 'axios'

export const getAllMatches = async (
    playerId: string | undefined,
    limit: number = 20,
    win: number | null = null
) => {
    try {
        if (win != null) {
            const response = await axios.get(
                `https://api.opendota.com/api/players/${playerId}/matches?limit=${limit}&win=${win}`
            )

            return response.data
        }
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/matches?limit=${limit}`
        )

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getMatches = async (playerId: number | undefined) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/recentMatches`
        )

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getOneMatch = async (matchId: string | undefined) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/matches/${matchId}`
        )

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}
