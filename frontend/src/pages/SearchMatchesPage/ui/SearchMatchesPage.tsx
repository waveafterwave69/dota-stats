import React from 'react'
import { useNavigate } from 'react-router'

import { useAppDispatch } from '@/app/providers/store/types'
import { setError } from '@/entities/player/model/playerSlice'
import { getOneMatch } from '@/entities/match/api/mathcApi'
import { SearchLayout } from '@/widgets/SearchLayout'
import { useScrollTop } from '@/shared/lib/hooks/useScrollTop'

const SearchMatchesPage: React.FC = () => {
    useScrollTop()

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
