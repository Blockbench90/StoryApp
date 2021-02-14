import {axios} from "./axios";
import {LoginFormProps} from "../pages/SingIn/components/LoginModal";
import { RegisterFormProps } from "../pages/SingIn/components/RegistrationModal";
import {Story} from "../store/reducers/stories/reducer";


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
        const { data } = await axios.post<ResponseApi>('/auth/login', { username: postData.email, password: postData.password })
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
    async getUserStories(userId: string): Promise<ResponseApi>{
        const {data} = await axios.get<ResponseApi>(`/profile/${userId}`)
        return data
    },
    // async addStory(payload: {title?: string, text: string, images?: string[]}): Promise<any>{
    //     const { data } = await axios.post<Response<Story>>('/stories', payload)
    //     console.log('data.data в апишке, после запроса на бек =', data.data)
    //     return data.data
    async uploadProfileAvatar(payload: string[]): Promise<ResponseApi>{
        console.log('url в начале запроса =', payload)
        const data = await axios.post<ResponseApi>('/user/avatar', payload)
        console.log('data после отправки запроса =', data)
        return data.data
    }
}
