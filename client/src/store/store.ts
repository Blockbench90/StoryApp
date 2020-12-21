import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga"

import {storiesReducer, StoriesState} from "./reducers/stories/storiesReducer"
import {storyReducer, StoryState} from "./reducers/story/storyReducer"
import userReducer from "./reducers/userReducer";
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
}

const rootReducer = combineReducers({
    stories: storiesReducer,
    story: storyReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, thunk)));

sagaMiddleware.run(rootSaga)