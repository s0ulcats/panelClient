import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUserById } from '../../redux/features/users/usersSlice';
import s from './UsersPage.module.scss';

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user || {});
  const { user: currentUser } = useSelector((state) => state.auth || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          user._id !== currentUser?._id // Исключаем текущего пользователя
      )
    );
  }, [searchTerm, users, currentUser]);

  const handleUserClick = (id) => {
    navigate(`/usdmRMKIa64EOQ9nVrBCCxD/${id}`);
  };

  const handleDeleteUser = async (id) => {
    if (id === currentUser?._id) {
      alert("You cannot delete your own profile!");
      return;
    }

    try {
      await dispatch(deleteUserById(id));
      dispatch(getAllUsers());  // Обновляем список пользователей после удаления
    } catch (error) {
      console.error("Ошибка при удалении пользователя", error);
    }
  };

  return (
    <div className={`${s.container}`}>
      <input
        type="text"
        placeholder="Search by username..."
        className={s.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={s.usersBlock}>
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className={s.userItem}
            >
              <AiOutlineUser className={s.userIcon} />
              <div className={s.username} onClick={() => handleUserClick(user._id)}>
                {user.username || 'Unknown user'}
              </div>
              <button
                className={s.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // Чтобы не вызывался клик на пользователя при удалении
                  handleDeleteUser(user._id);
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))
        ) : (
          <p>{'No users found'}</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
