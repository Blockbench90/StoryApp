import {Action} from "redux";
import {LoadingStatus} from "../../types";
import {StoryState} from "../story/storyReducer";
import {StoriesState} from "./storiesReducer";

export enum StoriesActionsTypes {
    SET_ALL_STORIES = 'stories/SET_ALL_STORIES',
    ADD_NEW_STORY = 'stories/ADD_NEW_STORY',
    SET_LOADING_STATE = 'stories/SET_LOADING_STATE'
}
//засетать все прилитевшие истории
interface SetAllStoriesActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload: StoriesState['items']
}
export const setAllStoriesAC = (payload: StoriesState['items']): SetAllStoriesActionInterface => ({
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload
})

//Создать новую историю
interface CreateNewStoryActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.ADD_NEW_STORY,
    payload: StoryState['text']
}
export const createNewStoryAC = (payload: string): CreateNewStoryActionInterface => ({
    type: StoriesActionsTypes.ADD_NEW_STORY,
    payload
})

export interface SetStoriesLoadingStatusActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoryLoadingStatus = (payload: LoadingStatus): SetStoriesLoadingStatusActionInterface => ({
    type: StoriesActionsTypes.SET_LOADING_STATE,
    payload,
});

export type StoriesActions =
    | SetAllStoriesActionInterface
    | CreateNewStoryActionInterface
    | SetStoriesLoadingStatusActionInterface

