import { Router } from 'express'
import authRouter from './routes/auth.routes'
import dotaRouter from './routes/dota.routes'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/dota', dotaRouter)

export default apiRouter
