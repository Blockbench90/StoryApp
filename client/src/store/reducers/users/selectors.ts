import {RootState} from "../../store";
import {User, UserState} from "./reducer";
import {LoadingStatus} from "../../types";

//state user полностью
export const selectUserState = (state: RootState): UserState => state.user

//только дата
export const selectUserData = (state: RootState): UserState['data'] => selectUserState(state).data

//достать id пользователя
export const selectUserDataID = (state: RootState): string => selectUserState(state).data._id

//только истории
export const selectUserStories = (state: RootState): UserState['stories'] => selectUserState(state).stories

//только статус
export const selectUserStatus = (state: RootState): UserState['status'] => selectUserState(state).status

//булево значинеи, наличия данных в дате
export const selectUserIsAuth = (state: RootState): boolean => !!selectUserState(state).data

//булево значинеи, наличия данных в историях юзера
export const selectUserDataStories = (state: RootState): boolean => !!selectUserState(state).stories

//булево значение, если статус загрузки назодиться в "ЗАГРУЗКА\LOADING\ЗАГРУЖАЕТСЯ"
export const selectUserIsLoading = (state: RootState): boolean =>
    selectUserState(state).status === LoadingStatus.LOADING

//булево значение, если статус загрузки назодиться в "ЗАГРУЖЕН\LOADED"
export const selectUserIsLoaded = (state: RootState): boolean =>
    selectUserState(state).status === LoadingStatus.LOADED