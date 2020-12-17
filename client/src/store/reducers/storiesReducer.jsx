import {StoriesApi} from "../../restApi/storiesApi";
import produce from "immer";

const SET_STORIES = '/stories/SET_STORIES'
const ADD_NEW_STORY = 'stories/ADD_NEW_STORY'
const DELETE_STORY = 'stories/DELETE_STORY'
const initialState = {
    items: [],
    isLoaded: true
}

const storiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STORIES:
            return produce(state, draft => {
                draft.items = action.payload
                draft.isLoaded = false
            })
        case ADD_NEW_STORY: {
            return produce(state, draft => {
                draft.items.unshift(action.payload)
                draft.isLoaded = false
            })
        }
        case DELETE_STORY: {
            return produce(state, draft => {
                draft.items= action.payload
                draft.isLoaded = false
            })
        }
        default:
            return state;
    }
}
export default storiesReducer

const setStories = (stories) => ({type: SET_STORIES, payload: stories})
const addNewFormStory = (story) => ({type: ADD_NEW_STORY, payload: story})

//получить все истории
export const fetchStories = () => (dispatch) => {
    StoriesApi.getStories().then((data) => dispatch(setStories(data.data)))
}
//добавить новую историю
export const createNewStoryData = (text) => (dispatch) => {
    StoriesApi.addStory(text).then((res) => dispatch(addNewFormStory(res.data))).then(res => console.log(res))
}
export const deleteStoryById = (id) => (dispatch) => {
    StoriesApi.deleteStory(id).then((res) => {
        console.log(res.status, "res.status after delete")
        if(res.status === 200) {
            dispatch(fetchStories())
        }
    })
}
