import { Router } from 'express'
import { redirectToSteam, steamReturn } from '../controllers/auth.controller'

const authRouter = Router()

authRouter.get('/steam', redirectToSteam)
authRouter.get('/steam/return', steamReturn)

export default authRouter
