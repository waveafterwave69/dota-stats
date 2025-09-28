import { getItems } from '../helpers/heroesHelpers'
import { useEffect, useState } from 'react'

interface Item {
    name: string
    id: number
    img: string
}

interface PlayerContextValue {
    items: Item[] | null
    isLoading: boolean
}

const useDota = (): PlayerContextValue => {
    const [items, setItems] = useState<Item[] | null>(null)
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
