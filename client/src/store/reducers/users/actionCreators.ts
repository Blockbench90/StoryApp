import {Action} from "redux";
import {User, UserState} from "./reducer";
import {LoadingStatus} from "../../types";
import {LoginFormProps} from "../../../pages/SingIn/components/LoginModal";
import {RegisterFormProps} from "../../../pages/SingIn/components/RegistrationModal";

export enum UserActionsType {
    FETCH_LOGIN = 'users/FETCH_LOGIN',
    FETCH_REGISTRATION = 'users/FETCH_REGISTRATION',
    FETCH_AUTH_USER_DATA = 'users/FETCH_AUTH_USER_DATA',
    SET_USER_DATA = 'users/SET_USER_DATA',
    SET_LOADING_STATUS_STATE = 'users/SET_LOADING_STATUS_STATE',
    SET_LOADING_STATUS_STORIES = 'users/SET_LOADING_STATUS_STORIES',
    FETCH_ALL_USER_STORIES = 'users/FETCH_ALL_USER_STORIES',
    SET_ALL_USER_STORIES = 'users/SET_ALL_USER_STORIES',
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
    payload: User
}

export const SetUserDataAC = (payload: User): SetUserDataAI => ({
    type: UserActionsType.SET_USER_DATA,
    payload
})

//начать запрос на получение всех историй пользователя
export interface FetchUserStoriesAI extends Action<UserActionsType>{
    type: UserActionsType.FETCH_ALL_USER_STORIES
    payload: string
}
export const FetchUserStoriesAC = (payload: string): FetchUserStoriesAI => ({
    type: UserActionsType.FETCH_ALL_USER_STORIES,
    payload
})

//засетать прилетевшие истории в стейт
export interface SetUserStoriesAI extends Action<UserActionsType>{
    type: UserActionsType.SET_ALL_USER_STORIES
    payload: UserState['stories']
}
export const SetUserStoriesAC = (payload: UserState['stories']): SetUserStoriesAI => ({
    type: UserActionsType.SET_ALL_USER_STORIES,
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
//установить статус загрузки для историй
export interface SetUserLoadingStatusStoriesAI extends Action<UserActionsType> {
    type: UserActionsType.SET_LOADING_STATUS_STORIES
    payload: LoadingStatus
}

export const SetUserLoadingStatusStoriesAC = (payload: UserState['storiesLoading']): SetUserLoadingStatusStoriesAI => ({
    type: UserActionsType.SET_LOADING_STATUS_STORIES,
    payload
})

export type UserActions =
    | FetchAuthAI
    | FetchLoginAI
    | FetchRegistrationAI
    | SetUserDataAI
    | SetUserLoadingStatusStateAI
    | FetchUserStoriesAI
    | SetUserStoriesAI
    | SetUserLoadingStatusStoriesAI


