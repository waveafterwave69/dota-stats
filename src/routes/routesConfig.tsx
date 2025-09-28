import MatchPage from '../pages/MatchPage/MatchPage'
import PlayerPage from '../pages/PlayerPage/PlayerPage'
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
]
