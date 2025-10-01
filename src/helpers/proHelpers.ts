import axios from 'axios'

export const getTeams = async () => {
    try {
        const response = await axios.get(`https://api.opendota.com/api/teams`)

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        response.data.length = 100

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getPro = async () => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/proPlayers`
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
