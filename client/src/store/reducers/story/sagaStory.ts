import {call, put, takeLatest} from 'redux-saga/effects';
import {FetchEditStoryDataActionInterface, FetchStoryDataActionInterface, setStoryByIdAC, setStoryLoadingStatusAC,  StoryActionsTypes} from "./actionCreators"
import {Story} from "../stories/storiesReducer";
import {StoriesApi} from "../../../restApi/storiesApi";
import {LoadingStatus} from "../../types";
import {fetchStoriesRequest} from "../stories/sagasStories";

//получить конкретную историю по id
export function* fetchStoryDataRequest ({payload: _id}: FetchStoryDataActionInterface) {
    try {
        const data: Story = yield call(StoriesApi.getStory, _id)
        yield put(setStoryByIdAC(data))
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

export function* editStoryDataRequest ({payload: _id}: FetchEditStoryDataActionInterface){
    try {
        const data: Story = yield call(StoriesApi.getStory, _id)
        yield put(setStoryByIdAC(data))
        yield call(StoriesApi.deleteStory, _id)
        yield call(fetchStoriesRequest)
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

export function* deleteStoryDataRequest({payload: _id}: any) {
    try  {
        const data: any = yield call(StoriesApi.deleteStory, _id)
        if(data.status === 200) {
            yield call(fetchStoriesRequest)
        }
    } catch (error) {
        yield put(setStoryLoadingStatusAC(LoadingStatus.ERROR))
    }
}

export function* storySaga() {
    yield takeLatest(StoryActionsTypes.FETCH_STORY_BY_ID, fetchStoryDataRequest)
    yield takeLatest(StoryActionsTypes.FETCH_EDIT_STORY_BY_ID, editStoryDataRequest)
}

