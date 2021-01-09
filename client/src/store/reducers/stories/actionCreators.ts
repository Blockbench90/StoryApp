import {Action} from "redux";
import {LoadingStatus} from "../../types";
import {StoryState} from "../story/reducer";
import {AddFormState, NewStory, StoriesState, Story} from "./reducer";

export enum StoriesActionsTypes {
    FETCH_ALL_STORIES = 'stories/FETCH_ALL_STORIES',
    SET_ALL_STORIES = 'stories/SET_ALL_STORIES',
    FETCH_ADD_STORY = 'stories/FETCH_ADD_STORY',
    SET_ADD_NEW_STORY = 'stories/SET_ADD_NEW_STORY',
    SET_STORIES_LOADING_STATE = 'stories/SET_STORIES_LOADING_STATE',
    SET_ADD_FORM_STATE = 'stories/SET_ADD_FORM_STATE',
}

//обнулить истории, установив пустой массив, и поставить статус "загружается"
//запустить сагу для загрузки историй
export interface FetchStoriesAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.FETCH_ALL_STORIES;
}
export const fetchStoriesAC = (): FetchStoriesAI => ({
    type: StoriesActionsTypes.FETCH_ALL_STORIES,
})
//засетать все прилитевшие истории из саги в стейт
export interface SetAllStoriesAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload: StoriesState['items']
}
export const setAllStoriesAC = (payload: StoriesState['items']): SetAllStoriesAI => ({
    type: StoriesActionsTypes.SET_ALL_STORIES,
    payload
})

//добавление новой сторис, запуск саги, и установка статуса "загрузка"
export interface FetchAddStoryAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.FETCH_ADD_STORY;
    payload: NewStory;
}
export const fetchAddStoryAC = (payload: NewStory): FetchAddStoryAI => ({
    type: StoriesActionsTypes.FETCH_ADD_STORY,
    payload,
});
//Создать новую историю
export interface CreateNewStoryAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ADD_NEW_STORY,
    payload: Story;
}
export const createNewStoryAC = (payload: Story): CreateNewStoryAI => ({
    type: StoriesActionsTypes.SET_ADD_NEW_STORY,
    payload
})

//установить статус загрузки историй, к примеру ошибка в саге при загрузке
export interface SetStoriesLoadingStatusAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_STORIES_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoriesLoadingStatusAC = (payload: LoadingStatus): SetStoriesLoadingStatusAI => ({
    type: StoriesActionsTypes.SET_STORIES_LOADING_STATE,
    payload,
})
//статус добавление истории через форму заполнения, к примеру ошибка в саге при загрузке
export interface SetAddFormStateAI extends Action<StoriesActionsTypes> {
    type: StoriesActionsTypes.SET_ADD_FORM_STATE;
    payload: AddFormState;
}
export const setAddFormStateAC = (payload: AddFormState): SetAddFormStateAI => ({
    type: StoriesActionsTypes.SET_ADD_FORM_STATE,
    payload,
});




export type StoriesActions =
    | FetchStoriesAI
    | SetAllStoriesAI
    | CreateNewStoryAI
    | SetStoriesLoadingStatusAI
    | SetAddFormStateAI
    | FetchAddStoryAI

