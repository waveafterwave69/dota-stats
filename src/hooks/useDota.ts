import { getItems } from '../helpers/heroesHelpers'
import { useEffect, useState } from 'react'

interface PlayerContextValue {
    items: any[]
    isLoading: boolean
}

const useDota = (): PlayerContextValue => {
    const [items, setItems] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const itemsData = await getItems()

            setItems(Object.values(itemsData))
            setIsLoading(false)
        }

        fetchData()
    }, [])

    return {
        items,
        isLoading,
    }
}

export default useDota
