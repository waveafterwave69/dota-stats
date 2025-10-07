import FavoritesItem from '../../components/FavoritesItem/FavoritesItem'
import { useAppSelector } from '../../hooks/hooks'
import styles from './FavoritesPage.module.css'

const FavoritesPage: React.FC = () => {
    const favorites = useAppSelector((state) => state.favorites.favorites)

    return (
        <section className={styles.favorites}>
            <h2 className={styles.favorites__title}>Избранные игроки</h2>
            <ul className={styles.favorites__list}>
                {favorites.length > 0 ? (
                    favorites.map((favItem) => (
                        <FavoritesItem
                            favItem={favItem}
                            key={favItem.account_id}
                        />
                    ))
                ) : (
                    <p>У вас нет избранных игроков.</p>
                )}
            </ul>
        </section>
    )
}

export default FavoritesPage
