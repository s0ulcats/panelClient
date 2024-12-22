import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout.jsx';
import UserProfileContainer from './components/UserProfile/UserProfileContainer.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import { getMe } from './redux/features/auth/authSlice';
import Preloader from './components/Preloader/Preloader.jsx';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.auth.token));
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getMe()).finally(() => setLoading(false)); // Завершаем загрузку
    } else {
      setLoading(false); // Если токен нет, сразу завершаем загрузку
      navigate('/'); // Перенаправляем на страницу входа, если нет токена
    }
}, [dispatch, navigate]);


  if (loading) {
    return <div><Preloader /></div>; // Показываем индикатор загрузки
  }

  return (
    <Layout>
      <Suspense fallback={<div><Preloader /></div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/meIcwHn8S5YlY9ArdJFJr" element={<MainPage />} />
          <Route path="/r5vJ1NCy8H0wwe4WjAALc" element={<RegisterPage />} />
          <Route path="/ugmXUScE1Ic9TdHUNhnKi" element={<UsersPage />} />
          <Route path="/usdmRMKIa64EOQ9nVrBCCxD/:id" element={<UserProfileContainer />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
