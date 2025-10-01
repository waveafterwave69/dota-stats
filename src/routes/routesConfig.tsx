import MatchPage from '../pages/MatchPage/MatchPage'
import PlayerPage from '../pages/PlayerPage/PlayerPage'
import PlayerPageMatches from '../pages/PlayerPageMatches/PlayerPageMatches'
import ProPage from '../pages/ProPage/ProPage'
import SearchPage from '../pages/SearchPage/SearchPage'

export const routesConfig = [
    {
        page: <SearchPage />,
        url: '/',
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
