import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {StoriesActions, StoriesActionsTypes} from "./actionCreators";

export enum AddFormState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export interface NewStory {
    _id?: string
    title?: string | undefined
    text: string
    images?: string[]
}
export interface Story {
    _id: string
    title?: string
    text: string
    images?: string[]
    createdAt: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

export interface StoriesState {
    items: Story[]
    addFormState: AddFormState
    LoadingStatus: LoadingStatus
}

const initialStoriesState: StoriesState = {
    items: [],
    addFormState: AddFormState.NEVER,
    LoadingStatus: LoadingStatus.NEVER
}

export const storiesReducer = produce((draft: Draft<StoriesState>, action: StoriesActions) => {
    switch (action.type) {
        //установить статус "загрузается" и запустить сагу для загрузки историй
        case StoriesActionsTypes.FETCH_ALL_STORIES:
            draft.items = []
            draft.LoadingStatus = LoadingStatus.LOADING
            break

        //засетать в стейт прилетевшие из саги истории
        case StoriesActionsTypes.SET_ALL_STORIES:
            draft.items = action.payload
            draft.LoadingStatus = LoadingStatus.LOADED
            break

        //добавить в конец новую историю и вернуть статус
        case StoriesActionsTypes.SET_ADD_NEW_STORY:
            // @ts-ignore
            draft.items.unshift(action.payload)
            draft.addFormState = AddFormState.NEVER
            break

        //установить статус для стейта, LoadingStatus
        case StoriesActionsTypes.SET_STORIES_LOADING_STATE:
            draft.LoadingStatus = action.payload
            break;

        //установить статус для добавления истории через форму
        case StoriesActionsTypes.SET_ADD_FORM_STATE:
            draft.addFormState = action.payload
            break

        default:
            break
    }
}, initialStoriesState)