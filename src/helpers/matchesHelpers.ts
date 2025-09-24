import axios from 'axios'

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

export const getOneMatches = async (matchId: number | undefined) => {
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
