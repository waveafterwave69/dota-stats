import axios from 'axios'

export const getPlayerInfo = async (playerId: string) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}`,
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
    if (!playerId) return { win: 0, lose: 0 }

    try {
        // Добавляем ?significant=0, чтобы сервер посчитал Turbo и нестандартные режимы
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/wl?significant=0`,
        )

        if (response.status !== 200) {
            throw new Error('Аккаунт не найден!')
        }

        return response.data // Вернет объект { win: 1042, lose: 937 }
    } catch (error: any) {
        console.log(error.message)
        return { win: 0, lose: 0 } // Безопасный объект-заглушка в случае ошибки сети
    }
}

export const getPlayerHeroes = async (playerId: number | undefined) => {
    try {
        const response = await axios.get(
            `https://api.opendota.com/api/players/${playerId}/heroes`,
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
