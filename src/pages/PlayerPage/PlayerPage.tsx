import MatchList from '../../components/MatchList/MatchList'
import PlayerPromo from '../../components/PlayerPromo/PlayerPromo'
import React, { useEffect, useState } from 'react'
import { getMatches } from '../../helpers/matchesHelpers'
import usePlayer from '../../hooks/usePlayer'
import type { MatchData } from '../../types/matchTypes'

const PlayerPage: React.FC = () => {
    const { playerInfo } = usePlayer()
    const [matches, setMatches] = useState<MatchData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true)
                const data = await getMatches(playerInfo?.profile?.account_id)
                setMatches(data)
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
            <MatchList error={error} matches={matches} loading={loading} />
        </>
    )
}

export default PlayerPage
