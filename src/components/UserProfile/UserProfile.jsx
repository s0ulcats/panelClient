import React from 'react';
import s from './UserProfile.module.scss';
import Preloader from '../Preloader/Preloader';

const UserProfile = ({ user, tokenLogs, currentUser, handleDeleteUser }) => {
    if (!user) {
        return <Preloader />
    }

    const avatar = user.username.trim().toUpperCase().split('').slice(0, 2).join('');  // Используем первые 2 буквы для аватара

    console.log("Rendering user profile for:", user.username);  // Отладочный вывод
    console.log("Token logs:", tokenLogs);  // Отладочный вывод

    return (
        <div className={s.profileContainer}>
            <div className={s.info}>
                <div className={s.avatar}>{avatar}</div>
                <div className={s.details}>
                    <div className={s.username}>{user.username}</div>
                </div>
            </div>

            {currentUser.username === 'specta' && (
                <button onClick={handleDeleteUser} className={s.deleteButton}>
                    {'Удалить пользователя'}
                </button>
            )}

            <div className={s.actionLog}>
                <h3>{'Action Log'}</h3>
                {Array.isArray(tokenLogs) && tokenLogs.length === 0 ? (
                    <p>{'No actions available'}</p>
                ) : (
                    <ul>
                        {Array.isArray(tokenLogs) && tokenLogs.map((log, index) => (
                            <li key={index}>
                                <span>{log.action}</span> -{' '}
                                <span>{log.idt}</span> -{' '}
                                <span>{new Date(log.updatedAt).toLocaleString()}</span>  {/* Используем updatedAt */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
