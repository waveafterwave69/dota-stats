import React from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../hooks/hooks'
import { setError } from '../../store/player/playerSlice'
import { getOneMatch } from '../../helpers/matchesHelpers'
import SearchLayout from '../../UI/SearchLayout/SearchLayout'

const SearchMatchesPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleMatchSearch = async (value: string) => {
        if (!/^\d+$/.test(value)) {
            dispatch(setError('Пожалуйста, введите числовой ID матча.'))
            return
        }

        try {
            const data = await getOneMatch(value)

            if (!data) {
                dispatch(setError('Матч не найден.'))
                return
            }

            navigate(`/match/${value}`)
        } catch (err) {
            dispatch(setError('Произошла ошибка при поиске матча.'))
        }
    }

    return (
        <SearchLayout
            placeholder="Найти матч (ID)"
            buttonText="Найти матч"
            onSearchSubmit={handleMatchSearch}
        />
    )
}

export default SearchMatchesPage
