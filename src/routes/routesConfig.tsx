import MatchPage from '../pages/MatchPage/MatchPage'
import PlayerPage from '../pages/PlayerPage/PlayerPage'
import PlayerPageMatches from '../pages/PlayerPageMatches/PlayerPageMatches'
import ProPage from '../pages/ProPage/ProPage'
import SearchPage from '../pages/SearchPage/SearchPage'
import SearchMatchesPage from '../pages/SearchMatchesPage/SearchMatchesPage'

export const routesConfig = [
    {
        page: <SearchPage />,
        url: '/',
    },
    {
        page: <SearchMatchesPage />,
        url: '/searchMatches',
    },
    {
        page: <PlayerPage />,
        url: '/player/:id',
    },
    {
        page: <MatchPage />,
        url: '/match/:id',
    },
    {
        page: <PlayerPageMatches />,
        url: '/matches/:id',
    },
    {
        page: <ProPage />,
        url: '/pro',
    },
]
