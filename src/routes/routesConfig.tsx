import { lazy } from 'react'

import SearchPage from '../pages/SearchPage/SearchPage'
import SearchMatchesPage from '../pages/SearchMatchesPage/SearchMatchesPage'

const ProPage = lazy(() => import('../pages/ProPage/ProPage'))
const PlayerPage = lazy(() => import('../pages/PlayerPage/PlayerPage'))
const MatchPage = lazy(() => import('../pages/MatchPage/MatchPage'))
const PlayerPageMatches = lazy(
    () => import('../pages/PlayerPageMatches/PlayerPageMatches'),
)
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'))

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
]
