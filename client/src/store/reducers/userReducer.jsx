import produce from "immer";
import {UserApi} from "../../restApi/userApi";

const FETCH_USER = 'users/FETCH_USER'
const AUTH_ME_USER = 'users/AUTH_ME_USER'
const ERROR_USER = 'users/ERROR_USER'


const initialState = {
    data: null,
    status: 'nothing',
    isAuth: false
}
//редьюсер пользователя
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        //на случай успешной логинизации, вернет статус "success" и данные на юзера
        case FETCH_USER: {
            return produce(state, draft => {
                draft.data = action.payload.data
                draft.status = 'success'
                draft.isAuth = true
            })
        }
        case AUTH_ME_USER: {
            return produce(state, draft => {
                draft.data = action.payload.data
                draft.status = 'success'
                draft.isAuth = true
            })
        }
        //в случае неправильной логинизации вернет статус "error"
        case ERROR_USER: {
            return produce(state, draft => {
                draft.status = 'error'
            })
        }
        default:
            return state
    }
}
export default userReducer


const setUser = (data) => ({type: FETCH_USER, payload: data})
const setUserError = (error) => ({type: ERROR_USER, payload: error})
export const authMeUser = (data) => ({type: AUTH_ME_USER, payload: data})

export const loginUserData = (postData) => async (dispatch) => {
    try {
        const data = await UserApi.signIn(postData)
        //в случае успешной логинизации запишет прилетевшие данные в стор
        dispatch(setUser(data))
        //и в хедерах браузера сохранит токен пользователя
        window.localStorage.setItem('token', data.data.token)
        console.log(data)
        // dispatch(fetchAuthMe(data.data))
    } catch (error) {
        //иначе ошибка и окно алерта
        dispatch(setUserError())
     }
}
export const registerUserData = (postData) => async (dispatch) => {
    try {
        const data = await UserApi.signUp(postData)
        //в случае успешной регистрации запишет прилетевшие данные в стор
        dispatch(setUser(data))
        //и в хедерах браузера сохранит токен пользователя
        window.localStorage.setItem('token', data.data.token)
    } catch (error) {
        //иначе ошибка и окно алерта
        dispatch(setUserError())
     }
}
export const fetchAuthMe = (data) => async (dispatch) => {
    try {
        //в случае успеха запишет прилетевшие данные в стор
        dispatch(authMeUser(data))
    } catch (error) {
        console.log(error)
        //иначе ошибка и окно алерта
        dispatch(setUserError())
     }
}
