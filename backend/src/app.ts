import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from '.'

dotenv.config()

const app = express()

const PORT: number = parseInt(process.env.PORT || '5000', 10)

const allowedOrigins: string[] = [
    process.env.FRONTEND_URL,
    'https://dota-stats-navy.vercel.app',
    'http://localhost:5173',
].filter((origin): origin is string => origin !== undefined && origin !== '')

console.log('✅ Allowed CORS origins:', allowedOrigins)

app.use(
    cors({
        origin: allowedOrigins,
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
        environment: process.env.NODE_ENV || 'development',
        allowedOrigins,
    })
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.originalUrl,
    })
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
    console.log(`🌍 Allowed origins:`, allowedOrigins)
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
})
