import { useNavigate } from 'react-router'

import styles from './FavoritesItem.module.css'

import deleteImg from '@/shared/assets/bin.png'

import { PlayerProfile } from '@/entities/player/model/types'

import { useAppDispatch } from '@/app/providers/store/types'
import { deleteFavorites } from '@/features/toggle-favorite/model/favoritesSlice'
import { fetchPlayerInfo } from '@/entities/player/model/playerSlice'

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
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    ) => {
        e.preventDefault()

        const success = await dispatch(
            fetchPlayerInfo(String(favItem.account_id)),
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
