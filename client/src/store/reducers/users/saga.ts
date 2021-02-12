import {call, put, takeLatest} from 'redux-saga/effects'
import {
    FetchLoginAI,
    FetchRegistrationAI,
    FetchUserStoriesAI,
    SetUserDataAC,
    SetUserLoadingStatusStateAC, SetUserLoadingStatusStoriesAC,
    SetUserStoriesAC,
    UserActionsType
} from './actionCreators'
import {LoadingStatus} from "../../types"
import {UserApi} from '../../../restApi/userApi'


//логинизация
export function* fetchLoginRequest({payload}: FetchLoginAI) {
    try {
        //перед попыткой логинизации, установить статус "загрузка"
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.LOADING))
        //Залогинится
        const {data} = yield call(UserApi.signIn, payload)
        //сохранить токен пользователя в LocalStorage
        window.localStorage.setItem('token', data.token)
        //засетать данные в стейт
        yield put(SetUserDataAC(data))
    } catch (error) {
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.ERROR))
    }
}

//регистрация
export function* fetchRegistrationRequest({payload}: FetchRegistrationAI) {
    try {
        //перед попыткой регистрация, установить статус "загрузка"
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.LOADING))
        //должна прилететь дата с confirmed: false
        yield call(UserApi.signUp, payload)
        //вместо даты, просто оповещаю пользователя, об успешной регистрации
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.SUCCESS))
    } catch (error) {
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.ERROR))
    }
}

//проверка аутентификации пользователя
export function* fetchIsAuthRequest () {
    try {
        //перед попыткой выяснения аутентификации, установить статус "загрузка"
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.LOADING))
        //в случае успеха получить данные пользователя, а иначе ошибка братья и сестры
        const { data } = yield call(UserApi.getMe)
        //засетать в стейт, прилетевшие данные
        yield put(SetUserDataAC(data))
    } catch (error) {
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.ERROR))
    }
}

//получение всех историй пользователя
export function* fetchUserStoriesRequest ({payload}: FetchUserStoriesAI) {
    try {
        yield put(SetUserLoadingStatusStoriesAC(LoadingStatus.LOADING))
        const { data } = yield call(UserApi.getUserStories, payload)
        //засетать в стейт, прилетевшие данные
        yield put(SetUserStoriesAC(data))
    } catch (error) {
        yield put(SetUserLoadingStatusStateAC(LoadingStatus.ERROR))
    }
}
export function* userSaga() {
    yield takeLatest(UserActionsType.FETCH_LOGIN, fetchLoginRequest);
    yield takeLatest(UserActionsType.FETCH_REGISTRATION, fetchRegistrationRequest);
    yield takeLatest(UserActionsType.FETCH_AUTH_USER_DATA, fetchIsAuthRequest);
    yield takeLatest(UserActionsType.FETCH_ALL_USER_STORIES, fetchUserStoriesRequest);
}
