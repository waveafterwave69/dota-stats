import { Request, Response } from 'express'
import axios from 'axios'

declare global {
    namespace Express {
        interface Request {
            user?: {
                steamId64: string
                username?: string
                avatar?: string
                avatarfull?: string
                profileUrl?: string
            }
        }
    }
}

export const getDotaProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.steamId64) {
            return res.status(401).json({
                message: 'Пользователь не авторизован',
            })
        }

        const steamId64 = req.user.steamId64
        const dotaId = Number(BigInt(steamId64) - BigInt(76561197960265728))

        console.log(
            '📡 Getting profile for Steam ID:',
            steamId64,
            'Dota ID:',
            dotaId,
        )

        let dotaData = null
        try {
            const response = await axios.get(
                `https://api.opendota.com/api/players/${dotaId}`,
                { timeout: 5000 },
            )
            dotaData = response.data
        } catch (error) {
            console.log('⚠️ OpenDota data not available')
        }

        res.json({
            steamId64: steamId64,
            username: req.user.username || 'Игрок',
            avatar: req.user.avatar || '',
            avatarfull: req.user.avatarfull || '',
            profileUrl:
                req.user.profileUrl ||
                `https://steamcommunity.com/profiles/${steamId64}`,
            dotaData: dotaData,
        })
    } catch (error: any) {
        console.error('❌ Get Dota Profile Error:', error.message)
        res.status(500).json({
            message: 'Не удалось получить данные профиля',
            error: error.message,
        })
    }
}

export const getPlayerByDotaId = async (req: Request, res: Response) => {
    try {
        const { dotaId } = req.params

        if (!dotaId) {
            return res.status(400).json({
                message: 'Dota ID не указан',
            })
        }

        console.log('📡 Getting player by Dota ID:', dotaId)

        const response = await axios.get(
            `https://api.opendota.com/api/players/${dotaId}`,
            { timeout: 10000 },
        )

        if (!response.data || !response.data.profile) {
            return res.status(404).json({
                message: 'Игрок не найден',
            })
        }

        const matchesResponse = await axios.get(
            `https://api.opendota.com/api/players/${dotaId}/recentMatches`,
            { timeout: 5000 },
        )

        const heroesResponse = await axios.get(
            `https://api.opendota.com/api/players/${dotaId}/heroes`,
            { timeout: 5000 },
        )

        res.json({
            profile: response.data.profile,
            mmr: response.data.mmr_estimate,
            rank: response.data.rank_tier,
            leaderboard: response.data.leaderboard_rank,
            recentMatches: matchesResponse.data,
            heroes: heroesResponse.data,
            winLoss: response.data.win_losses,
        })
    } catch (error: any) {
        console.error('❌ Get Player Error:', error.message)

        if (error.response?.status === 404) {
            return res.status(404).json({
                message: 'Игрок не найден в OpenDota',
            })
        }

        res.status(500).json({
            message: 'Не удалось получить данные игрока',
            error: error.message,
        })
    }
}
