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

export enum PAGES {
    SEARCH = '/',
    SEARCH_MATCHES = '/searchMatches',
    PLAYER = '/player/:id',
    MATCH = '/match/:id',
    PLAYER_MATCHES = '/matches/:id',
    PRO = '/pro',
    FAVORITES = '/favorites',
    AUTH_CALLBACK = '/auth/callback',
    AUTH_ERROR = '/auth/error',
}

export const routesConfig = [
    {
        page: SearchPage,
        url: PAGES.SEARCH,
    },
    {
        page: SearchMatchesPage,
        url: PAGES.SEARCH_MATCHES,
    },
    {
        page: PlayerPage,
        url: PAGES.PLAYER,
    },
    {
        page: MatchPage,
        url: PAGES.MATCH,
    },
    {
        page: PlayerPageMatches,
        url: PAGES.PLAYER_MATCHES,
    },
    {
        page: ProPage,
        url: PAGES.PRO,
    },
    {
        page: FavoritesPage,
        url: PAGES.FAVORITES,
    },
    {
        page: AuthCallback,
        url: PAGES.AUTH_CALLBACK,
    },
    {
        page: AuthError,
        url: PAGES.AUTH_ERROR,
    },
]
