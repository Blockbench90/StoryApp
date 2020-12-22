import { all } from 'redux-saga/effects'
import {storiesSaga} from "./reducers/stories/sagas";
import {storySaga} from "./reducers/story/saga";
import {userSaga} from "./reducers/users/saga";

export default function* rootSaga (){
    yield all([storiesSaga(), storySaga(), userSaga()])
}