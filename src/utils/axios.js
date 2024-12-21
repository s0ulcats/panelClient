import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://145.223.23.122:3000/api'
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;