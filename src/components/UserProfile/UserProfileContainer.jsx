import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import { getUserById, deleteUserById } from '../../redux/features/users/usersSlice';
import { getTokenLogs } from '../../redux/features/auth/authSlice';  // Import the correct action
import Preloader from '../Preloader/Preloader';

const UserProfileContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
    const { tokenLogs, loading: tokenLogsLoading, error: tokenLogsError } = useSelector((state) => state.auth);  // Получаем логи токенов
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        console.log("Fetching user with id:", id);  // Отладочный вывод
        dispatch(getUserById(id));  // Получаем данные пользователя
    }, [dispatch, id]);

    useEffect(() => {
        if (user && user.username) {
            console.log("Fetching token logs for username:", user.username);  // Отладочный вывод
            dispatch(getTokenLogs(user.username));  // Получаем логи токенов
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (tokenLogs) {
            console.log("Received token logs:", tokenLogs);  // Логируем полученные токены
        }
    }, [tokenLogs]);

    const handleDeleteUser = async () => {
        try {
            await dispatch(deleteUserById(user._id));
            navigate('/users');
        } catch (error) {
            console.error("Ошибка при удалении пользователя", error);
        }
    };

    if (userLoading || tokenLogsLoading) return <Preloader />;
    if (userError) return <div>Error: {userError}</div>;

    if (tokenLogsError) {
        console.error("Ошибка при получении логов токенов:", tokenLogsError);  // Логируем ошибку
        return <div>Error: {tokenLogsError}</div>;
    }

    return <UserProfile user={user} tokenLogs={tokenLogs} currentUser={currentUser} handleDeleteUser={handleDeleteUser} />;
};

export default UserProfileContainer;
