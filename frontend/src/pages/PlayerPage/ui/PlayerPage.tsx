import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/providers/store/types'

import MatchList from '@/entities/match/ui/MatchList/MatchList'
import PlayerHeroes from '@/entities/player/ui/PlayerHeroes/PlayerHeroes'
import PlayerPromo from '@/entities/player/ui/PlayerPromo/PlayerPromo'
import { PlayerHeroesI } from '@/entities/player/model/types'
import { MatchData } from '@/entities/match/model/types'
import { getMatches } from '@/entities/match/api/mathcApi'
import { getPlayerHeroes } from '@/entities/player/api/playerApi'
import { Spinner } from '@/shared/ui'

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
                    playerInfo?.profile?.account_id,
                )
                const heroesData = await getPlayerHeroes(
                    playerInfo?.profile?.account_id,
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
            {loading ? (
                <Spinner width={110} />
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
