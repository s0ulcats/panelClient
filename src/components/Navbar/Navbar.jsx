import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, getMe, logout } from '../../redux/features/auth/authSlice';
import Logo from './Logo.png';
import s from './Navbar.module.scss';
import { AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { user: authUser } = useSelector((state) => state.auth);
  const activeStyles = {
    fontWeight: 'bold',
    borderBottom: '2px solid #7a7a7a',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authUser) {
      dispatch(getMe()); // Получение данных пользователя только если токен есть
    }
  }, [dispatch, authUser]);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout successful');
    navigate('/login')
  };

  return (
    <nav className={`${s.nav}`}>
      <div className={s.container}>
        {isAuth && (
          <NavLink to="/main">
            <img className={s.logo} src={Logo} alt="Logo" />
          </NavLink>
        )}
        {isAuth && authUser && authUser.username === 'specta' && (
          <>
            <NavLink to="/r5vJ1NCy8H0wwe4WjAALc" style={({ isActive }) => (isActive ? activeStyles : undefined)}>Register</NavLink>
            <NavLink to="/ugmXUScE1Ic9TdHUNhnKi" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              <AiOutlineUser /> {'Users'}
            </NavLink>
          </>
        )}
        {isAuth ? (
            <button onClick={logoutHandler} className={s.logoutBtn}>
              LOGOUT
            </button>
        ) : (
          <Link to="/" className={s.loginBtn}>
            Enter
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
