import axios from 'axios';
//небольшая поднастройка, для токена
axios.interceptors.request.use((config) => {
    config.headers['token'] = window.localStorage.getItem('token');
    return config;
});

export { axios };