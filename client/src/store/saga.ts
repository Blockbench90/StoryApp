import { all } from 'redux-saga/effects'
import {storiesSaga} from "./reducers/stories/sagasStories";
import {storySaga} from "./reducers/story/sagaStory";

export default function* rootSaga (){
    yield all([storiesSaga(), storySaga()])
}