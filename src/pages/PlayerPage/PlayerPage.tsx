import MatchList from '../../components/MatchList/MatchList'
import PlayerPromo from '../../components/PlayerPromo/PlayerPromo'
import React, { useEffect, useState } from 'react'
import { getMatches } from '../../helpers/matchesHelpers'
import type { MatchData } from '../../types/matchTypes'
import { useAppSelector } from '../../hooks/hooks'
import PlayerHeroes from '../../components/PlayerHeroes/PlayerHeroes'
import { getPlayerHeroes } from '../../helpers/playerHelpers'
import type { PlayerHeroesI } from '../../types/playerTypes'

const PlayerPage: React.FC = () => {
    const playerInfo = useAppSelector((state) => state.player.playerInfo)
    const [matches, setMatches] = useState<MatchData[]>([])
    const [heroes, setHeroes] = useState<PlayerHeroesI[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true)
                const matchesData = await getMatches(
                    playerInfo?.profile?.account_id
                )
                const heroesData = await getPlayerHeroes(
                    playerInfo?.profile?.account_id
                )
                setMatches(matchesData)
                setHeroes(heroesData)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        if (playerInfo?.profile?.account_id) {
            fetchMatches()
        }
    }, [playerInfo?.profile?.account_id])

    return (
        <>
            <PlayerPromo />
            <PlayerHeroes heroes={heroes} loading={loading} />
            <MatchList error={error} matches={matches} loading={loading} />
        </>
    )
}

export default PlayerPage
