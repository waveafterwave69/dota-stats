import axios from 'axios'

export const getHeroes = async () => {
    try {
        const response = await axios.get(
            'https://api.opendota.com/api/constants/heroes'
        )

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}

export const getItems = async () => {
    try {
        const response = await axios.get(
            'https://api.opendota.com/api/constants/items'
        )

        return response.data
    } catch (error: any) {
        console.log(error.message)
        return error.message
    }
}
