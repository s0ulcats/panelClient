import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/features/auth/authSlice';
import s from './Register.module.scss';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { username: '', password: '' };
    if (!username) newErrors.username = 'Username is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      dispatch(registerUser({ username, password }))
        .unwrap()
        .then((response) => {
          if (response.message) {
          } else {
          }
        })
        .catch(() => {
        });
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${s.form}`}>
      <label>
        <input
          type="text"
          placeholder={'Username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${s.input} `}
          autoComplete="username"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}
      </label>
      <label>
        <input
          type="password"
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${s.input}`}
          autoComplete="new-password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </label>
      <div className={s.actions}>
        <button type="submit" className={s.button}>{'Submit'}</button>
      </div>
    </form>
  );
};
