import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {
    getDotaProfile,
    getPlayerByDotaId,
} from '../controllers/dota.controller'

const dotaRouter = Router()

dotaRouter.get('/profile', authMiddleware, getDotaProfile)
dotaRouter.get('/player/:dotaId', getPlayerByDotaId)

export default dotaRouter
