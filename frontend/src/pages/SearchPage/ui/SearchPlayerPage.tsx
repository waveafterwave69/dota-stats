import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAppDispatch } from '@/app/providers/store/types'
import { fetchPlayerInfo, setError } from '@/entities/player/model/playerSlice'
import { SearchLayout } from '@/widgets/SearchLayout'

const SearchPlayerPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePlayerSearch = async (value: string) => {
        if (!/^\d+$/.test(value)) {
            dispatch(setError('Пожалуйста, введите числовой Steam ID игрока.'))
            return
        }

        setIsLoading(true)

        const success = await dispatch(fetchPlayerInfo(value))
        if (success) {
            navigate(`/player/${value}`)
            setIsLoading(false)
        }
    }

    return (
        <SearchLayout
            isLoading={isLoading}
            placeholder="Найти игрока (Steam ID)"
            buttonText="Найти игрока"
            onSearchSubmit={handlePlayerSearch}
        />
    )
}

export default SearchPlayerPage
