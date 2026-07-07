import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: {
                steamId64: string
            }
        }
    }
}
