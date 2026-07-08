import React, { useEffect, useState, useMemo } from 'react'

import styles from './ProPage.module.css'
import { ProPlayer, Team } from '@/entities/pro/model/types'
import { getPro, getTeams } from '@/entities/pro/api/proApi'
import SearchPro from '@/entities/pro/ui/SearchPro/SearchPro'
import ListPro from '@/entities/pro/ui/ListPro/ListPro'
import { useScrollTop } from '@/shared/lib/hooks/useScrollTop'

const ProPage: React.FC = () => {
    useScrollTop()

    const [teams, setTeams] = useState<Team[]>([])
    const [players, setPlayers] = useState<ProPlayer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const [searchPlayer, setSearchPlayer] = useState<string>('')
    const [currTeams, setCurrTeams] = useState<Team | null>(null)

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true)
                setIsError(false)

                const [teamsData, playersData] = await Promise.all([
                    getTeams(),
                    getPro(),
                ])

                const validTeams = teamsData.filter(
                    (team: Team) => team.name?.trim() !== '',
                )

                setTeams(validTeams)
                setPlayers(playersData || [])
            } catch (error) {
                setIsError(true)
                console.error('Ошибка при загрузке про-игроков:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchInitialData()
    }, [])

    const filteredPlayersByTeam = useMemo(() => {
        if (!currTeams) return null
        return players.filter((player) => player.team_id === currTeams.team_id)
    }, [players, currTeams])

    return (
        <main className={styles.proPage}>
            <h1 className={styles.pro__title}>Про-Игроки</h1>

            <SearchPro
                currTeams={currTeams}
                teams={teams}
                isLoading={isLoading}
                setSearchPlayer={setSearchPlayer}
                setCurrTeams={setCurrTeams}
            />

            {isError ? (
                <div className={styles.error_banner} role="alert">
                    Не удалось загрузить списки игроков. Пожалуйста, обновите
                    страницу.
                </div>
            ) : (
                <ListPro
                    players={players}
                    teams={teams}
                    searchPlayer={searchPlayer}
                    isLoading={isLoading}
                    searchTeam={filteredPlayersByTeam}
                />
            )}
        </main>
    )
}

export default ProPage
