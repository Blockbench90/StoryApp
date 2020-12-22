import {Action} from "redux";
import {User, UserState} from "./reducer";
import {LoadingStatus} from "../../types";

//TODO: при типизации логин формы, перенести тип туда
export interface LoginFormProps {
    email: string
    password: string
}

//TODO: при типизации формы регистрации, перенести тип туда
export interface RegisterFormProps {
    fullname: string
    username: string
    email: string
    password: string
    password2: string
}

export enum UserActionsType {
    FETCH_LOGIN = 'users/FETCH_LOGIN',
    FETCH_REGISTRATION = 'users/FETCH_REGISTRATION',
    FETCH_AUTH_USER_DATA = 'users/FETCH_AUTH_USER_DATA',
    SET_USER_DATA = 'users/SET_USER_DATA',
    SET_LOADING_STATUS_STATE = 'users/SET_LOADING_STATUS_STATE',
}

//начать отправку запроса на логинизацию, установка статуса, запуск саги, сохранение токена в LocalStorage
export interface FetchLoginAI extends Action<UserActionsType> {
    type: UserActionsType.FETCH_LOGIN
    payload: LoginFormProps
}

export const FetchLoginAC = (payload: LoginFormProps): FetchLoginAI => ({
    type: UserActionsType.FETCH_LOGIN,
    payload
})

//начать отправу запроса на регистрацию пользователя
export interface FetchRegistrationAI extends Action<UserActionsType> {
    type: UserActionsType.FETCH_REGISTRATION
    payload: RegisterFormProps
}

export const FetchRegistrationAC = (payload: RegisterFormProps): FetchRegistrationAI => ({
    type: UserActionsType.FETCH_REGISTRATION,
    payload
})

//начать запрос на проверку логинизации
export interface FetchAuthAI extends Action<UserActionsType> {
    type: UserActionsType.FETCH_AUTH_USER_DATA
}

export const FetchAuthAC = (): FetchAuthAI => ({
    type: UserActionsType.FETCH_AUTH_USER_DATA
})

//засетать прилетевшую дату в стор, с помощью волшебной саги))ууууфффф
export interface SetUserDataAI extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA
    payload: User | undefined
}

export const SetUserDataAC = (payload: UserState['data']): SetUserDataAI => ({
    type: UserActionsType.SET_USER_DATA,
    payload
})

//установить статус загрузки
export interface SetUserLoadingStatusStateAI extends Action<UserActionsType> {
    type: UserActionsType.SET_LOADING_STATUS_STATE
    payload: LoadingStatus
}

export const SetUserLoadingStatusStateAC = (payload: UserState['status']): SetUserLoadingStatusStateAI => ({
    type: UserActionsType.SET_LOADING_STATUS_STATE,
    payload
})

export type UserActions =
    | FetchAuthAI
    | FetchLoginAI
    | FetchRegistrationAI
    | SetUserDataAI
    | SetUserLoadingStatusStateAI


