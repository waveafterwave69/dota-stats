import { useEffect, useState } from 'react'
import { getPro, getTeams } from '../../helpers/proHelpers'
import SearchPro from '../../components/SearchPro/SearchPro'
import type { ProPlayer, Team } from '../../types/proTypes'
import styles from './ProPage.module.css'
import ListPro from '../../components/ListPro/ListPro'

const ProPage: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [players, setPlayers] = useState<ProPlayer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchPlayer, setSearchPlayer] = useState<string>('')
    const [currTeams, setCurrTeams] = useState<Team | null>(null)
    const [searchTeam, setSearchTeam] = useState<ProPlayer[] | any>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true)
            const teamsData = await getTeams()
            const playersData = await getPro()

            const namesTeam: Team[] = teamsData.filter(
                (team: Team) => team.name !== ''
            )

            setTeams(namesTeam)
            setPlayers(playersData)
            setIsLoading(false)
        }

        fetchTeams()
    }, [])

    useEffect(() => {
        if (currTeams) {
            const filteredPlayersByTeam = players.filter(
                (player) => player.team_id === currTeams.team_id
            )

            setSearchTeam(filteredPlayersByTeam)
        } else {
            setSearchTeam(null)
        }
    }, [currTeams])

    return (
        <>
            <h2 className={styles.pro__title}>Про-Игроки</h2>
            <SearchPro
                currTeams={currTeams}
                teams={teams}
                isLoading={isLoading}
                setSearchPlayer={setSearchPlayer}
                setCurrTeams={setCurrTeams}
            />
            <ListPro
                players={players}
                teams={teams}
                searchPlayer={searchPlayer}
                isLoading={isLoading}
                searchTeam={searchTeam}
                setSearchTeam={setSearchTeam}
            />
        </>
    )
}

export default ProPage
