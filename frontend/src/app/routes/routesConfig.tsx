import { lazy } from 'react'

import { SearchPage } from '@/pages/SearchPage'
import { SearchMatchesPage } from '@/pages/SearchMatchesPage'
import AuthCallback from '@/pages/AuthCallback'
import AuthError from '@/pages/AuthError'
import { PAGES } from './pages'

export const NAV_ITEMS = [
    { path: PAGES.SEARCH, label: 'Игроки' },
    { path: PAGES.SEARCH_MATCHES, label: 'Матчи' },
    // { path: PAGES.PRO, label: 'Про-Игроки' },
    { path: PAGES.FAVORITES, label: 'Избранные' },
]

const PlayerPage = lazy(() => import('@/pages/PlayerPage'))
const MatchPage = lazy(() => import('@/pages/MatchPage'))
const PlayerPageMatches = lazy(() => import('@/pages/PlayerPageMatches'))
const ProPage = lazy(() => import('@/pages/ProPage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))

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
