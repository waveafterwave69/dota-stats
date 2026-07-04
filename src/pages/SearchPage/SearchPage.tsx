import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchPlayerInfo, setError } from '../../store/player/playerSlice'
import SearchLayout from '../../UI/SearchLayout/SearchLayout'

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
