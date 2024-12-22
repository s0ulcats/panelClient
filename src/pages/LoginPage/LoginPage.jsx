import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import s from './Login.module.scss';
import Preloader from '../../components/Preloader/Preloader';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector((state) => (state.auth.token));
  const { status, isLoading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/meIcwHn8S5YlY9ArdJFJr');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
        const response = await dispatch(loginUser({ username, password })).unwrap();
        if (response.message) {
            toast.error(response.message);
        } else {
            toast.success('Login Success');
        }
        setUsername('');
        setPassword('');
    } catch (error) {
        toast.error('Invalid Credentials');
    }
};

  if (isLoading) {
    return <div><Preloader /></div>;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.form}>
      <label className={s.label}>
        <input
          type="text"
          placeholder={'Username'}
          value={username}
          className={s.input}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label className={s.label}>
        <input
          type="password"
          placeholder={'Password'}
          value={password}
          className={s.input}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className={s.buttonGroup}>
        <button type='submit' className={s.submitButton} onClick={handleSubmit} disabled={isLoading}>
          {'Enter'}
        </button>
      </div>
    </form>
  );
};
