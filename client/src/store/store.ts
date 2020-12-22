import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga"

import {storiesReducer, StoriesState} from "./reducers/stories/reducer"
import {storyReducer, StoryState} from "./reducers/story/reducer"
import {userReducer, UserState} from "./reducers/users/reducer";
import thunk from "redux-thunk";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
    stories: StoriesState
    story: StoryState
    user: UserState
}

const rootReducer = combineReducers({
    stories: storiesReducer,
    story: storyReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, thunk)));

sagaMiddleware.run(rootSaga)