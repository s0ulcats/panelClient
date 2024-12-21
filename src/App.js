import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout.jsx';
import UserProfileContainer from './components/UserProfile/UserProfileContainer.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import { getMe } from './redux/features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
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
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserProfileContainer />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

export default App;
