import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

import styles from './PlayerPromo.module.css'
import { useAppDispatch, useAppSelector } from '@/app/providers/store/types'
import useRank from '@/entities/medal/lib/useRank'
import {
    addFavorites,
    deleteFavorites,
} from '@/features/toggle-favorite/model/favoritesSlice'
import { Spinner } from '@/shared/ui'

const PlayerPromo: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { profile, rankMedal, rankName, winRate, winLose, loading, error } =
        useRank()
    const favorites = useAppSelector((state) => state.favorites.favorites)

    const isValidId = id && /^\d+$/.test(id)
    const accountId = isValidId ? Number(id) : null

    const isProfileLoaded = profile && accountId === profile.account_id

    const isFavorite = favorites.some((el) => el.account_id === Number(id))

    const handleToggleFavorite = () => {
        if (!profile) return
        if (isFavorite) {
            dispatch(deleteFavorites(profile))
        } else {
            dispatch(addFavorites(profile))
        }
    }

    if (error) {
        return (
            <section className={styles.promo}>
                <div className={styles.promo__error}>
                    <p>❌ Ошибка загрузки профиля</p>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.promo__button}
                    >
                        Вернуться на главную
                    </button>
                </div>
            </section>
        )
    }

    if (!isValidId) {
        return (
            <section className={styles.promo}>
                <div className={styles.promo__loading}>
                    <p>⏳ Неверный ID игрока</p>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.promo__button}
                    >
                        Вернуться на главную
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.promo}>
            <div className={styles.promo__row}>
                <div className={styles.promo__profile}>
                    <img
                        src={profile?.avatarfull}
                        alt={profile?.personaname || 'Avatar'}
                        className={styles.promo__avatar}
                    />
                    <div className={styles.text__content}>
                        <p className={styles.text__name}>
                            {profile?.personaname || 'Загрузка...'}
                        </p>
                        <p className={styles.text}>
                            Аккаунт ID: {profile?.account_id}
                        </p>
                        {profile?.loccountrycode && (
                            <p className={styles.text}>
                                Регион: {profile.loccountrycode}
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.rank}>
                        {rankMedal && (
                            <img
                                src={rankMedal}
                                alt={rankName}
                                className={styles.rank__img}
                            />
                        )}
                        <p className={styles.rank__name}>
                            {rankName || 'Без ранга'}
                        </p>
                    </div>

                    <div className={styles.stats}>
                        {winRate ? (
                            <p className={styles.winrate}>
                                Винрейт: {winRate}%
                            </p>
                        ) : (
                            <p className={styles.winrate}>Загрузка...</p>
                        )}
                        <div className={styles.win__lose}>
                            <span className={styles.win}>{winLose?.win} W</span>
                            <span className={styles.divider}>/</span>
                            <span className={styles.lose}>
                                {winLose?.lose} L
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.promo__nav}>
                <nav className={styles.nav__list}>
                    <NavLink
                        to={`/player/${profile?.account_id}`}
                        className={({ isActive }) =>
                            `${styles.list__item} ${isActive ? styles.active : ''}`
                        }
                    >
                        Обзор
                    </NavLink>
                    <NavLink
                        to={`/matches/${profile?.account_id}`}
                        className={({ isActive }) =>
                            `${styles.list__item} ${isActive ? styles.active : ''}`
                        }
                    >
                        Матчи
                    </NavLink>
                </nav>

                <button
                    className={`${styles.promo__button} ${isFavorite ? styles.promo__button_delete : ''}`}
                    onClick={handleToggleFavorite}
                    disabled={!profile}
                >
                    {isFavorite ? 'Удалить из избранного' : 'В избранное'}
                </button>
            </div>
        </section>
    )
}

export default PlayerPromo
