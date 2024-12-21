import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout.jsx';
import { getMe } from './redux/features/auth/authSlice';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import UserProfileContainer from './components/UserProfile/UserProfileContainer.jsx';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.auth.token));
  const [loading, setLoading] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Если токен существует, попытаться получить данные пользователя
    if (token) {
      dispatch(getMe())
        .catch(() => setAuthFailed(true)) // Если ошибка, изменим состояние
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Нет токена, сразу прекращаем загрузку
    }
  }, [dispatch]);

  if (authFailed) {
    return <div>Authentication Failed</div>; // Если ошибка при получении данных
  }

  return (
    <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={isAuth ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/register" element={isAuth ? <RegisterPage /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuth ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path="/user/:id" element={isAuth ? <UserProfileContainer /> : <Navigate to="/login" />} />
        </Routes>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
