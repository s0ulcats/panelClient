import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, getMe, logout } from '../../redux/features/auth/authSlice';
import Logo from './Logo.png';
import s from './Navbar.module.scss';
import { AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
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
      dispatch(getMe());
    }
  }, [dispatch, authUser]);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout successful');
  };

  return (
    <nav className={`${s.nav}`}>
      <div className={s.container}>
        <NavLink to="/">
          <img className={s.logo} src={Logo} alt="Logo" />
        </NavLink>
        {isAuth && authUser && authUser.username === 'specta' && (
          <>
            <NavLink to="/register" style={({ isActive }) => (isActive ? activeStyles : undefined)}>Register</NavLink>
            <NavLink to="/users" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
              <AiOutlineUser /> {'Users'}
            </NavLink>
          </>
        )}
        {isAuth ? (
          <button onClick={logoutHandler} className={s.logoutBtn}>
            LOGOUT
          </button>
        ) : (
          <Link to="/login" className={s.loginBtn}>
            Enter
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
