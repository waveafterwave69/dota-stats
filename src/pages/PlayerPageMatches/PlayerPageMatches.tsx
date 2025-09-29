import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { getAllMatches } from '../../helpers/matchesHelpers'
import { type MatchData } from '../../types/matchTypes'
import MatchList from '../../components/MatchList/MatchList'
import PlayerPromo from '../../components/PlayerPromo/PlayerPromo'
import usePlayer from '../../hooks/usePlayer'

const PlayerPageMatches: React.FC = () => {
    const { winLose } = usePlayer()
    const [matches, setMatches] = useState<MatchData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [themeLoading, setThemeLoading] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(20)
    const params = useParams()

    const observer = useRef<IntersectionObserver | null>(null)
    const lastMatchElementRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setLimit((prevLimit) => prevLimit + 20)
                }
            })

            if (node) observer.current.observe(node)
        },
        [loading]
    )

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true)
            if (winLose != null) {
                const mathcesData = await getAllMatches(
                    params.id,
                    limit,
                    winLose
                )

                setMatches(mathcesData)
            } else {
                const mathcesData = await getAllMatches(params.id, limit)

                setMatches(mathcesData)
            }
            setLoading(false)
        }

        fetchMatches()
    }, [limit])

    useEffect(() => {
        const fetchMatches = async () => {
            setThemeLoading(true)
            if (winLose != null) {
                const mathcesData = await getAllMatches(
                    params.id,
                    limit,
                    winLose
                )

                setMatches(mathcesData)
            } else {
                const mathcesData = await getAllMatches(params.id, limit)

                setMatches(mathcesData)
            }
            setThemeLoading(false)
        }

        fetchMatches()
    }, [winLose])

    return (
        <>
            <PlayerPromo />
            <MatchList
                matches={matches}
                loading={loading}
                error={null}
                title="Матчи"
                winOrLose={true}
                lastMatchElementRef={lastMatchElementRef}
                themeLoading={themeLoading}
            />
        </>
    )
}

export default PlayerPageMatches
