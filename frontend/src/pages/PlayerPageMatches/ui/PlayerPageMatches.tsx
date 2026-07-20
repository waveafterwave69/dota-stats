import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '@/app/providers/store/types'
import {
    setPlayerId,
    setAllMatchesData,
    setLimit,
} from '@/entities/player/model/playerSlice'
import { getAllMatches } from '@/entities/match/api/mathcApi'

import PlayerPromo from '@/entities/player/ui/PlayerPromo/PlayerPromo'
import MatchList from '@/entities/match/ui/MatchList/MatchList'

const PlayerPageMatches: React.FC = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const playerId = params.id

    const winLose = useAppSelector((state) => state.player.winLose)
    const cachedPlayerId = useAppSelector(
        (state) => state.player.cachedPlayerId,
    )
    const matches = useAppSelector((state) => state.player.allMatches)
    const limit = useAppSelector((state) => state.player.currentLimit)

    const [loading, setLoading] = useState<boolean>(false)

    const observer = useRef<IntersectionObserver | null>(null)
    const lastMatchElementRef = useCallback(
        (node: HTMLLIElement | null) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(setLimit(limit + 20))
                }
            })

            if (node) observer.current.observe(node)
        },
        [loading, limit, dispatch],
    )

    useEffect(() => {
        if (!playerId) return

        dispatch(setPlayerId(playerId))

        const fetchMatches = async () => {
            setLoading(true)
            try {
                const mathcesData =
                    winLose != null
                        ? await getAllMatches(playerId, limit, winLose)
                        : await getAllMatches(playerId, limit)

                console.log(mathcesData)

                dispatch(setAllMatchesData(mathcesData))
            } catch (error) {
                console.error('Ошибка загрузки матчей:', error)
            } finally {
                setLoading(false)
            }
        }

        if (
            cachedPlayerId !== playerId ||
            matches.length === 0 ||
            limit > matches.length
        ) {
            fetchMatches()
        }
    }, [limit, winLose, playerId, cachedPlayerId, dispatch])

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
                themeLoading={loading}
            />
        </>
    )
}

export default PlayerPageMatches
