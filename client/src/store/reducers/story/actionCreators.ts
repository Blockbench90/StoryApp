import {StoryState} from "./reducer";
import {Action} from "redux";
import {LoadingStatus} from "../../types";

//экшены для отдельно взятой истории
export enum StoryActionsTypes {
    FETCH_STORY_BY_ID = 'story/FETCH_STORY_BY_ID',
    SET_STORY_BY_ID = 'story/SET_STORY_BY_ID',
    FETCH_EDIT_STORY_BY_ID = 'story/FETCH_EDIT_STORY_BY_ID',
    DELETE_STORY_BY_ID = 'story/DELETE_STORY_BY_ID',
    SET_STORY_LOADING_STATE = 'story/SET_STORY_LOADING_STATE',
    CLEAR_STORY_AFTER_EDIT = 'story/CLEAR_STORY_AFTER_EDIT'
}


//сделать запрос за конкретной историю по ID и установить статус "загрузка"
export interface FetchStoryDataAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.FETCH_STORY_BY_ID
    payload: string
}
export const fetchStoryByIdAC = (payload: string): FetchStoryDataAI => ({
    type: StoryActionsTypes.FETCH_STORY_BY_ID,
    payload
})

//засетать в стейт полученную конкретную историю по ID
export interface SetStoryDataByIdAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_STORY_BY_ID
    payload: StoryState['data']
}
export const setStoryByIdAC = (payload: StoryState['data']): SetStoryDataByIdAI => ({
    type: StoryActionsTypes.SET_STORY_BY_ID,
    payload
})

//удалить историю
export interface DeleteStoryByIdAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.DELETE_STORY_BY_ID
    payload: string
}
export const deleteStoryByIdAC = (payload: string): DeleteStoryByIdAI => ({
    type: StoryActionsTypes.DELETE_STORY_BY_ID,
    payload
})

//редактировать историю
export interface FetchEditStoryDataAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.FETCH_EDIT_STORY_BY_ID
    payload: string
}
export const fetchEditStoryAC = (payload: string): FetchEditStoryDataAI => ({
    type: StoryActionsTypes.FETCH_EDIT_STORY_BY_ID,
    payload
})
export interface clearStoryDataAfterEditAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.CLEAR_STORY_AFTER_EDIT
}
export const clearStoryDataAfterEditAC = (): clearStoryDataAfterEditAI => ({
    type: StoryActionsTypes.CLEAR_STORY_AFTER_EDIT
})

//установить скатус загрузки
export interface SetStoryLoadingStatusAI extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_STORY_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoryLoadingStatusAC = (payload: LoadingStatus): SetStoryLoadingStatusAI => ({
    type: StoryActionsTypes.SET_STORY_LOADING_STATE,
    payload,
});

export type StoryActions =
    | FetchStoryDataAI
    | SetStoryDataByIdAI
    | SetStoryLoadingStatusAI
    | FetchEditStoryDataAI
    | DeleteStoryByIdAI
    | clearStoryDataAfterEditAI


