import styles from './Spinner.module.css'

import spinner from '@/shared/assets/spinner.svg'

interface SpinnerProps {
    width?: number
}

const Spinner: React.FC<SpinnerProps> = ({ width }) => {
    return (
        <>
            <img
                src={spinner}
                style={{ width: width }}
                alt="loading..."
                className={styles.spinner}
            />
        </>
    )
}

export default Spinner
