import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {UserActions, UserActionsType} from "./actionCreators";

export interface User {
    _id?: string
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
    data: User | undefined;
    status: LoadingStatus;
}


const initialState: UserState = {
    data: undefined,
    status: LoadingStatus.NEVER
}

//редьюсер пользователя
export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
        //на случай успешной логинизации, вернет статус "success" и данные на юзера
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload
            draft.status = LoadingStatus.SUCCESS
            break
        //установка статуса
        case UserActionsType.SET_LOADING_STATUS_STATE:
            draft.status = action.payload
            break

        default:
            break
    }
}, initialState)
