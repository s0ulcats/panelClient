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

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Если токен существует, попытаться получить данные пользователя
    if (token) {
      dispatch(getMe())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки до получения данных
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={isAuth ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/register" element={isAuth ? <RegisterPage /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuth ? <UsersPage /> : <Navigate to="/login" />} />
          <Route path="/user/:id" element={isAuth ? <UserProfileContainer /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
