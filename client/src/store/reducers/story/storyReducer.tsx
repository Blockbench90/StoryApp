import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {StoryActions, StoryActionsTypes} from "./actionCreators";

//rootreducer для отдельно взятой истории
export enum AddStoryState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
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

export interface StoryState {
    data?: Story | undefined;
    LoadingStatus: LoadingStatus;
    isLoaded?: boolean;
    title?: string;
    text: string
}

const initialStoryState: StoryState = {
    data: undefined,
    LoadingStatus: LoadingStatus.NEVER,
    title: '',
    text: ''
}
//для манипуляций над определенной историей, к примеру редактированию
const storyReducer = produce((draft: Draft<StoryState>, action: StoryActions) => {
    switch (action.type) {
        case StoryActionsTypes.FETCH_STORY_BY_ID:
            draft.data = action.payload
            draft.LoadingStatus = LoadingStatus.LOADED
            break
        case StoryActionsTypes.EDIT_STORY:
            draft.text = action.payload.text
            draft.title = action.payload.title
            draft.LoadingStatus = LoadingStatus.LOADED
            break
        case StoryActionsTypes.CLEAR_STORY:
            draft.text = ''
            draft.title = ''
            break
        default:
            break
    }
}, initialStoryState)
export default storyReducer

