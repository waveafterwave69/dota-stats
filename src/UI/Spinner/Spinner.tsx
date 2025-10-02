import styles from './Spinner.module.css'

import spinner from '../../assets/spinner.svg'

const Spinner: React.FC = () => {
    return (
        <>
            <img src={spinner} alt="loading..." className={styles.spinner} />
        </>
    )
}

export default Spinner
