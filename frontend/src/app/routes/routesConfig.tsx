import { lazy } from 'react'

import { SearchPage } from '@/pages/SearchPage'
import { SearchMatchesPage } from '@/pages/SearchMatchesPage'
import AuthCallback from '@/pages/AuthCallback'
import AuthError from '@/pages/AuthError'

const PlayerPage = lazy(() => import('@/pages/PlayerPage'))
const MatchPage = lazy(() => import('@/pages/MatchPage'))
const PlayerPageMatches = lazy(() => import('@/pages/PlayerPageMatches'))
const ProPage = lazy(() => import('@/pages/ProPage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))

export const routesConfig = [
    {
        page: SearchPage,
        url: '/',
    },
    {
        page: SearchMatchesPage,
        url: '/searchMatches',
    },
    {
        page: PlayerPage,
        url: '/player/:id',
    },
    {
        page: MatchPage,
        url: '/match/:id',
    },
    {
        page: PlayerPageMatches,
        url: '/matches/:id',
    },
    {
        page: ProPage,
        url: '/pro',
    },
    {
        page: FavoritesPage,
        url: '/favorites',
    },
    {
        page: AuthCallback,
        url: '/auth/callback',
    },
    {
        page: AuthError,
        url: '/auth/error',
    },
]
