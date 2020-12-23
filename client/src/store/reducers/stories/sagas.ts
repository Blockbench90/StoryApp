import {call, put, takeLatest} from 'redux-saga/effects';
import {StoriesApi} from "../../../restApi/storiesApi";
import {createNewStoryAC, CreateNewStoryAI, setAddFormStateAC, setAllStoriesAC, setStoryLoadingStatusAC, StoriesActionsTypes } from "./actionCreators";
import {LoadingStatus} from "../../types";
import {AddFormState} from "./reducer";

//Выполнить запрос всех сторис
export function* fetchStoriesRequest(){
    try {
        const stories = yield call(StoriesApi.getStories)
        yield put(setAllStoriesAC(stories))
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}
//запрос на добавление новой истории
export function* createNewStoryRequest ({payload: text}: CreateNewStoryAI) {
    try {
        yield put(setAddFormStateAC(AddFormState.LOADING))
        const {data} = yield call(StoriesApi.addStory, text)
        yield put(createNewStoryAC(data))
        // yield call(fetchStoriesRequest)
    } catch (error) {

        yield put(setAddFormStateAC(AddFormState.ERROR))
    }
}
//отлови тип экшена и сделай соответствующий запрос
export function* storiesSaga(){
    yield takeLatest(StoriesActionsTypes.FETCH_ALL_STORIES, fetchStoriesRequest)
    yield takeLatest(StoriesActionsTypes.FETCH_ADD_STORY, createNewStoryRequest)
}


