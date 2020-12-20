import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import storiesReducer from "./reducers/stories/storiesReducer";
import storyReducer from "./reducers/story/storyReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    stories: storiesReducer,
    story: storyReducer,
    user: userReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
