import type { PlayerProfile } from '../../types/playerTypes'
import styles from './FavoritesItem.module.css'
import { deleteFavorites } from '../../store/favorites/favoritesSlice'
import { useNavigate } from 'react-router'
import deleteImg from '../../assets/bin.png'
import { fetchPlayerInfo } from '../../store/player/playerSlice'
import { useAppDispatch } from '../../hooks/hooks'

interface FavoritesItemProps {
    favItem: PlayerProfile
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({ favItem }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleDelete = () => {
        dispatch(deleteFavorites(favItem))
    }

    const onClick = async (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        e.preventDefault()

        const success = await dispatch(
            fetchPlayerInfo(String(favItem.account_id))
        )

        if (success && favItem.personaname) {
            navigate(`/player/${favItem.account_id}`)
        }
    }

    return (
        <>
            <li className={styles.item}>
                <div onClick={onClick} className={styles.item__content}>
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
                </div>
                <button onClick={handleDelete} className={styles.item__button}>
                    <img src={deleteImg} alt="Удалить" />
                </button>
            </li>
        </>
    )
}

export default FavoritesItem
