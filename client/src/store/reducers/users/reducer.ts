import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {UserActions, UserActionsType} from "./actionCreators";
import {Story} from "../stories/reducer";

export interface User {
    _id: string
    email: string
    fullname: string
    username: string
    password: string
    confirmHash: string
    confirmed?: boolean
    location?: string
    about?: string
    website?: string
}

export interface UserState {
    data?: User | undefined
    stories: Story[] | undefined
    storiesLoading: LoadingStatus
    status: LoadingStatus
}
const data = {
    _id: '',
    email: '',
    fullname: '',
    username: '',
    password: '',
    confirmHash: '',
    confirmed: false,
    location: '',
    about: '',
    website: ''
}

const initialState: UserState = {
    data: undefined,
    stories: undefined,
    storiesLoading: LoadingStatus.NEVER,
    status: LoadingStatus.NEVER,
}

//редьюсер пользователя
export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
        //на случай успешной логинизации, вернет статус "success" и данные на юзера
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload
            draft.status = LoadingStatus.SUCCESS
            break
        //начать запрос на все истории юзера
        case UserActionsType.FETCH_ALL_USER_STORIES:
            draft.stories = undefined
            break
        //засетать все истории юзера
        case UserActionsType.SET_ALL_USER_STORIES:
            draft.stories = action.payload
            draft.storiesLoading = LoadingStatus.LOADED
            break
        //установка статуса
        case UserActionsType.SET_LOADING_STATUS_STATE:
            draft.status = action.payload
            break
        //установка статуса загрузки историй
        case UserActionsType.SET_LOADING_STATUS_STORIES:
            draft.storiesLoading = action.payload
            break

        default:
            break
    }
}, initialState)
