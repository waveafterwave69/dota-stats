import axios from 'axios'

export const getItems = async () => {
    try {
        const response = await axios.get(
            'https://api.opendota.com/api/constants/items',
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
