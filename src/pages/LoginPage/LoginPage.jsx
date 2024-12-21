import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import s from './Login.module.scss';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
        const response = await dispatch(loginUser({ username, password })).unwrap();
        toast.success(response.message || 'Login Successful');
        setUsername('');
        setPassword('');
        navigate('/');
    } catch (error) {
        toast.error(error || 'Invalid Credentials');
    }
};

  return (
    <form onSubmit={(e) => e.preventDefault()} className={`${s.form}`}>
      <label className={s.label}>
        <input
          type="text"
          placeholder={'Username'}
          value={username}
          className={`${s.input}`}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label className={s.label}>
        <input
          type="password"
          placeholder={'Password'}
          value={password}
          className={`${s.input}`}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className={s.buttonGroup}>
        <button type='submit' className={s.submitButton} onClick={handleSubmit}>
          {'Enter'}
        </button>
      </div>
    </form>
  );
};