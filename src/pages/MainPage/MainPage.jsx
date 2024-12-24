import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './MainPage.module.scss';
import { useSelector } from 'react-redux';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

const MainPage = () => {
  const isAuth = useSelector(checkIsAuth);
  return (
    <div className={s.container}>
      {isAuth && (
        <>
        <div className={s.block}>
        <NavLink to="/steamp" className={s.link}>Steam</NavLink>
      </div>
      </>
      )}
    </div>
  );
};

export default MainPage;
