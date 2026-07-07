// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const STEAM_RETURN = `${BACKEND_URL}/api/auth/steam/return`
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const STEAM_API_KEY = process.env.STEAM_API_KEY

export const redirectToSteam = (req: Request, res: Response) => {
    try {
        const params = {
            'openid.ns': 'http://specs.openid.net/auth/2.0',
            'openid.mode': 'checkid_setup',
            'openid.return_to': STEAM_RETURN,
            'openid.realm': BACKEND_URL,
            'openid.identity':
                'http://specs.openid.net/auth/2.0/identifier_select',
            'openid.claimed_id':
                'http://specs.openid.net/auth/2.0/identifier_select',
        }

        const queryString = Object.entries(params)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
            )
            .join('&')

        const steamUrl = `https://steamcommunity.com/openid/login?${queryString}`

        console.log('🔄 Redirecting to Steam...')
        console.log('📡 BACKEND_URL:', BACKEND_URL)
        console.log('📡 STEAM_RETURN:', STEAM_RETURN)
        res.redirect(steamUrl)
    } catch (error) {
        console.error('❌ Steam redirect error:', error)
        res.status(500).json({ error: 'Failed to redirect to Steam' })
    }
}

export const steamReturn = async (req: Request, res: Response) => {
    console.log('=== Steam Return Callback ===')
    console.log('Query params:', req.query)

    try {
        if (!STEAM_API_KEY) {
            console.error('❌ STEAM_API_KEY не настроен!')
            return res.redirect(
                `${FRONTEND_URL}/auth/error?message=api_key_missing`,
            )
        }

        const { 'openid.identity': identity } = req.query

        if (!identity) {
            console.error('❌ No identity returned from Steam')
            return res.redirect(
                `${FRONTEND_URL}/auth/error?message=no_identity`,
            )
        }

        const steamId = (identity as string).split('/').pop()

        if (!steamId) {
            console.error('❌ Failed to extract Steam ID')
            return res.redirect(
                `${FRONTEND_URL}/auth/error?message=invalid_steam_id`,
            )
        }

        console.log('✅ Steam ID extracted:', steamId)

        const steamResponse = await axios.get(
            'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
            {
                params: {
                    key: STEAM_API_KEY,
                    steamids: steamId,
                },
            },
        )

        const player = steamResponse.data?.response?.players?.[0]

        if (!player) {
            console.error('❌ Player not found')
            return res.redirect(
                `${FRONTEND_URL}/auth/error?message=player_not_found`,
            )
        }

        console.log('✅ Player data received:', {
            steamid: player.steamid,
            personaname: player.personaname,
            avatar: player.avatar,
        })

        const token = jwt.sign(
            {
                steamId64: player.steamid,
                username: player.personaname,
                avatar: player.avatar,
                avatarfull: player.avatarfull || player.avatarmedium,
                profileUrl: player.profileurl,
            },
            JWT_SECRET,
            { expiresIn: '7d' },
        )

        console.log('✅ JWT token generated')

        const redirectUrl = `${FRONTEND_URL}/auth/callback#token=${token}`
        console.log('🔄 Redirecting to:', redirectUrl)

        res.redirect(redirectUrl)
    } catch (error) {
        console.error('❌ Steam return error:', error)
        res.redirect(`${FRONTEND_URL}/auth/error?message=unknown_error`)
    }
}
