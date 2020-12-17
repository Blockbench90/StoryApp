import * as axios from "axios";

//небольшая поднастройка, для токена
export const withConfig = axios.interceptors.request.use((config) => {
        config.headers['token'] = window.localStorage.getItem('token');
        return config;
    })


//запросы для работы с пользователем
export const UserApi = {
    //залогиниться
    async signIn(postData) {
        const { data } = await axios.post('/auth/login', { username: postData.email, password: postData.password }, withConfig);
        return data;
    },
    //зарегистрироваться
    async signUp(postData){
        const { data } = await axios.post('/auth/register', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
        return data;
    },
    //подтвердить вход, аутентификация
    async getMe(){
        const { data } = await axios.get('/users/me', withConfig);
        return data;
    },
}

//для проверки с консоли, потом убрать
window.AuthApi = UserApi;