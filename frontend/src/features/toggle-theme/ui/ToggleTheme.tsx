import { useEffect, useState, type FC } from 'react'
import styles from './ToggleTheme.module.css'

interface ToggleThemeProps {}

type Theme = 'dark' | 'light'

const ToggleTheme: FC<ToggleThemeProps> = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme
        }
        return 'dark'
    })

    const handleToggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme')
        } else {
            document.documentElement.classList.remove('light-theme')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    return <button onClick={handleToggleTheme}>TOGGLE</button>
}

export default ToggleTheme
