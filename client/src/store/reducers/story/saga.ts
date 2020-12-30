import {call, put, takeLatest} from 'redux-saga/effects';
import {
    DeleteStoryByIdAI,
    FetchEditStoryDataAI,
    FetchStoryDataAI,
    setStoryByIdAC,
    setStoryLoadingStatusAC,
    StoryActionsTypes
} from "./actionCreators"
import {Story} from "../stories/reducer";
import {StoriesApi} from "../../../restApi/storiesApi";
import {LoadingStatus} from "../../types";
import {fetchStoriesRequest} from "../stories/sagas";
import {FetchUserStoriesAC} from "../users/actionCreators";
import {fetchUserStoriesRequest} from "../users/saga";


//получить конкретную историю по id
export function* fetchStoryDataRequest ({payload: _id}: FetchStoryDataAI) {
    try {
        const data: Story = yield call(StoriesApi.getStory, _id)
        yield put(setStoryByIdAC(data))
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

//редактировать историю
export function* editStoryDataRequest ({payload: _id}: FetchEditStoryDataAI){
    try {
        const data: Story = yield call(StoriesApi.getStory, _id)
        yield put(setStoryByIdAC(data))
        const res = yield call(StoriesApi.deleteStory, _id)
        if(res.status === 200) {
            yield put(setStoryLoadingStatusAC(LoadingStatus.REDACTION))
        }
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

//удалить историю
export function* deleteStoryDataRequest({payload}: DeleteStoryByIdAI) {
    try  {
        const data: any = yield call(StoriesApi.deleteStory, payload._id)
        if(data.status === 200) {
            yield call(fetchStoriesRequest)
            yield put(FetchUserStoriesAC(payload.userId))
        }
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

export function* storySaga() {
    yield takeLatest(StoryActionsTypes.FETCH_STORY_BY_ID, fetchStoryDataRequest)
    yield takeLatest(StoryActionsTypes.FETCH_EDIT_STORY_BY_ID, editStoryDataRequest)
    yield takeLatest(StoryActionsTypes.DELETE_STORY_BY_ID, deleteStoryDataRequest)
}

