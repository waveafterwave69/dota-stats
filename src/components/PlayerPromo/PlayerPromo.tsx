import { NavLink } from 'react-router'
import useRank from '../../hooks/useRank'
import styles from './PlayerPromo.module.css'

const PlayerPromo: React.FC = () => {
    const { profile, rankMedal, rankName, winRate, winLose } = useRank()

    return (
        <>
            <section className={styles.promo}>
                <div className={styles.promo__row}>
                    <div className={styles.promo__profile}>
                        <img
                            src={profile?.avatarfull}
                            alt={profile?.personaname}
                        />
                        <div className={styles.text__contet}>
                            <p className={styles.text__name}>
                                {profile?.personaname}
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
                    <div className={styles.ifno}>
                        <div className={styles.rank}>
                            {rankMedal && (
                                <img
                                    src={rankMedal}
                                    alt={rankMedal}
                                    className={styles.rank__img}
                                />
                            )}

                            <p className={styles.rank__name}>{rankName}</p>
                        </div>
                        {winRate ? (
                            <p className={styles.winrate}>
                                Винрейт: {winRate}%
                            </p>
                        ) : (
                            <p className={styles.winrate}>Загрузка...</p>
                        )}
                        <div className={styles.win__lose}>
                            <span className={styles.win}>
                                {winLose?.win} побед
                            </span>{' '}
                            -{' '}
                            <span className={styles.lose}>
                                {winLose?.lose} поражений
                            </span>{' '}
                        </div>
                    </div>
                </div>
                <div className={styles.promo__nav}>
                    <ul className={styles.nav__list}>
                        <li>
                            <NavLink
                                to={`/player/${profile?.account_id}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.list__item} ${styles.active}`
                                        : styles.list__item
                                }
                            >
                                Обзор
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/player/matches/${profile?.account_id}`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.list__item} ${styles.active}`
                                        : styles.list__item
                                }
                            >
                                Матчи
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default PlayerPromo
