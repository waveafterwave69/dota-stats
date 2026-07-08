import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '@/app/providers/store/types'

import MatchList from '@/entities/match/ui/MatchList/MatchList'
import PlayerHeroes from '@/entities/player/ui/PlayerHeroes/PlayerHeroes'
import PlayerPromo from '@/entities/player/ui/PlayerPromo/PlayerPromo'
import { getMatches } from '@/entities/match/api/mathcApi'
import { getPlayerHeroes } from '@/entities/player/api/playerApi'
import { Spinner } from '@/shared/ui'
import {
    setMainPageData,
    setPlayerId,
} from '@/entities/player/model/playerSlice'
import { useScrollTop } from '@/shared/lib/hooks/useScrollTop'

const PlayerPage: React.FC = () => {
    useScrollTop()

    const dispatch = useDispatch()
    const playerInfo = useAppSelector((state) => state.player.playerInfo)

    const cachedPlayerId = useAppSelector(
        (state) => state.player.cachedPlayerId,
    )
    const matches = useAppSelector((state) => state.player.mainMatches)
    const heroes = useAppSelector((state) => state.player.heroes)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const accountId = playerInfo?.profile?.account_id?.toString()

    useEffect(() => {
        if (!accountId) return

        dispatch(setPlayerId(accountId))

        const fetchMatches = async () => {
            try {
                setLoading(true)
                const matchesData = await getMatches(accountId)
                const heroesData = await getPlayerHeroes(accountId)

                dispatch(
                    setMainPageData({
                        matches: matchesData,
                        heroes: heroesData,
                    }),
                )
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        if (cachedPlayerId !== accountId || matches.length === 0) {
            fetchMatches()
        }
    }, [accountId, cachedPlayerId, matches.length, dispatch])

    const showSpinner = loading && matches.length === 0

    return (
        <>
            <PlayerPromo />
            {showSpinner ? (
                <Spinner width={100} />
            ) : (
                <>
                    <PlayerHeroes heroes={heroes} loading={loading} />
                    <MatchList
                        error={error}
                        matches={matches}
                        loading={loading}
                    />
                </>
            )}
        </>
    )
}

export default PlayerPage
