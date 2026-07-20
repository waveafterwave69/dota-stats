import type { FC, ReactNode } from 'react'
import styles from './SectionLayout.module.css'

interface SectionLayoutProps {
    children: ReactNode
}

const SectionLayout: FC<SectionLayoutProps> = ({ children }) => {
    return <div className={styles.layout}>{children}</div>
}

export default SectionLayout
