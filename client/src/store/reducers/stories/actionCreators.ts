import {Action} from "redux";
import {LoadingStatus} from "../../types";
import {StoryState} from "../story/storyReducer";
import {AddFormState, StoriesState} from "./storiesReducer";

export enum StoriesActionsTypes {
    FETCH_ALL_STORIES = 'stories/FETCH_ALL_STORIES',
    SET_ALL_STORIES = 'stories/SET_ALL_STORIES',
    FETCH_ADD_STORY = 'stories/FETCH_ADD_STORY',
    SET_ADD_NEW_STORY = 'stories/SET_ADD_NEW_STORY',
    SET_LOADING_STATE = 'stories/SET_LOADING_STATE',
    SET_ADD_FORM_STATE = 'stories/SET_ADD_FORM_STATE',
}

//обнулить истории, установив пустой массив, и поставить статус "загружается"
//запустить сагу для загрузки историй
export interface FetchStoriesActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.FETCH_ALL_STORIES;
}
export const fetchStoriesAC = (): FetchStoriesActionInterface => ({
    type: StoriesActionsTypes.FETCH_ALL_STORIES,
})
//засетать все прилитевшие истории из саги в стейт
interface SetAllStoriesActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload: StoriesState['items']
}
export const setAllStoriesAC = (payload: StoriesState['items']): SetAllStoriesActionInterface => ({
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload
})

//чтобы установить статус загрузки при добавлении новой сторис
export interface FetchAddStoryActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.FETCH_ADD_STORY;
    payload: string;
}
export const fetchAddStoryAC = (payload: string): FetchAddStoryActionInterface => ({
    type: StoriesActionsTypes.FETCH_ADD_STORY,
    payload,
});
//Создать новую историю
export interface CreateNewStoryActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ADD_NEW_STORY,
    payload: StoryState['text']
}
export const createNewStoryAC = (payload: string): CreateNewStoryActionInterface => ({
    type: StoriesActionsTypes.SET_ADD_NEW_STORY,
    payload
})

//установить статус загрузки историй, к примеру ошибка в саге при загрузке
export interface SetStoriesLoadingStatusActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoryLoadingStatusAC = (payload: LoadingStatus): SetStoriesLoadingStatusActionInterface => ({
    type: StoriesActionsTypes.SET_LOADING_STATE,
    payload,
})
//статус добавление истории через форму заполнения, к примеру ошибка в саге при загрузке
export interface SetAddFormStateActionInterface extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ADD_FORM_STATE;
    payload: AddFormState;
}
export const setAddFormStateAC = (payload: AddFormState): SetAddFormStateActionInterface => ({
    type: StoriesActionsTypes.SET_ADD_FORM_STATE,
    payload,
});




export type StoriesActions =
    | FetchStoriesActionInterface
    | SetAllStoriesActionInterface
    | CreateNewStoryActionInterface
    | SetStoriesLoadingStatusActionInterface
    | SetAddFormStateActionInterface
    | FetchAddStoryActionInterface

