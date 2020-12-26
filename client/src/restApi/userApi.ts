import {axios} from "./axios";
import {LoginFormProps} from "../pages/SingIn/components/LoginModal";
import { RegisterFormProps } from "../pages/SingIn/components/RegistrationModal";


//небольшая поднастройка, для токена
// export const withConfig = axios.interceptors.request.use((config) => {
//         config.headers['token'] = window.localStorage.getItem('token');
//         return config;
//     })

interface ResponseApi {
    status: string;
    data: any;
}

//запросы для работы с пользователем
export const UserApi = {
    //залогиниться
    async signIn(postData: LoginFormProps): Promise<ResponseApi> {
        console.log(postData)
        const { data } = await axios.post<ResponseApi>('/auth/login', { username: postData.email, password: postData.password })
        console.log(data)
        return data;
    },
    //зарегистрироваться
    async signUp(postData: RegisterFormProps): Promise<ResponseApi>{
        const { data } = await axios.post<ResponseApi>('/auth/register', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
        return data;
    },
    //подтвердить вход, аутентификация
    async getMe(): Promise<ResponseApi>{
        const { data } = await axios.get<ResponseApi>('/users/me');
        return data;
    },
}
//для проверки с консоли, потом убрать


// @ts-ignore
// window.AuthApi = AuthApi;