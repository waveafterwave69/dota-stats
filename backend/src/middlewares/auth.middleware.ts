import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Не авторизован. Токен отсутствует.',
            })
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: 'Неверный формат токена.',
            })
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'secret'

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any

            req.user = {
                steamId64: decoded.steamId64,
                username: decoded.username || decoded.personaname,
                avatar: decoded.avatar,
                avatarfull: decoded.avatarfull,
                profileUrl: decoded.profileUrl || decoded.profileurl,
            }

            next()
        } catch (jwtError) {
            return res.status(401).json({
                message: 'Неверный или просроченный токен.',
            })
        }
    } catch (error) {
        console.error('❌ Auth middleware error:', error)
        return res.status(500).json({
            message: 'Ошибка при проверке токена.',
        })
    }
}
