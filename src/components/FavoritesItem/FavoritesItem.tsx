import { useDispatch } from 'react-redux'
import type { PlayerProfile } from '../../types/playerTypes'
import styles from './FavoritesItem.module.css'
import { deleteFavorites } from '../../store/favorites/favoritesSlice'
import { Link } from 'react-router'
import deleteImg from '../../assets/bin.png'

interface FavoritesItemProps {
    favItem: PlayerProfile
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({ favItem }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteFavorites(favItem))
    }

    return (
        <>
            <li className={styles.item}>
                <Link
                    to={`/player/${favItem.account_id}`}
                    className={styles.item__content}
                >
                    <img
                        src={favItem.avatarfull}
                        alt={favItem.personaname}
                        className={styles.item__img}
                    />
                    <div className={styles.text__contet}>
                        <h4 className={styles.text__name}>
                            {favItem.personaname}
                        </h4>
                        <p className={styles.text}>
                            Аккаунт ID: {favItem?.account_id}
                        </p>
                        {favItem.loccountrycode && (
                            <p>Регион: {favItem.loccountrycode}</p>
                        )}
                    </div>
                </Link>
                <button onClick={handleDelete} className={styles.item__button}>
                    <img src={deleteImg} alt="Удалить" />
                </button>
            </li>
        </>
    )
}

export default FavoritesItem
