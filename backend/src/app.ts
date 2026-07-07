import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from '.'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    }),
)

app.use(express.json())

app.use('/api', apiRouter)

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    })
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.originalUrl,
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
})
