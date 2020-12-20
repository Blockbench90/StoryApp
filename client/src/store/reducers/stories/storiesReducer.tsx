import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {StoriesActions, StoriesActionsTypes} from "./actionCreators";

export enum AddFormState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export interface Story {
    _id: string
    title?: string
    text: string
    createdAt: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

export interface StoriesState {
    items: Story[]
    LoadingStatus: LoadingStatus
    addFormState: AddFormState
}

const initialStoriesState: StoriesState = {
    items: [],
    LoadingStatus: LoadingStatus.NEVER,
    addFormState: AddFormState.NEVER
}

const storiesReducer = produce((draft: Draft<StoriesState>, action: StoriesActions) => {
    switch (action.type) {
        case StoriesActionsTypes.SET_ALL_STORIES:
            draft.items = action.payload
            draft.LoadingStatus = LoadingStatus.LOADED
            break
        case StoriesActionsTypes.ADD_NEW_STORY:
            // draft.items = draft.items.push(action.payload)
            // @ts-ignore
            draft.items.unshift(action.payload)
            draft.LoadingStatus = LoadingStatus.LOADED
            break
        case StoriesActionsTypes.SET_LOADING_STATE:
            // @ts-ignore
            draft.addFormState = action.payload
            break;
        default:
            break
    }
}, initialStoriesState)

export default storiesReducer





