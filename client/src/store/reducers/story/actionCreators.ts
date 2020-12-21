import {StoryState} from "./storyReducer";
import {Action} from "redux";
import {LoadingStatus} from "../../types";

//экшены для отдельно взятой истории
export enum StoryActionsTypes {
    FETCH_STORY_BY_ID = 'stories/FETCH_STORY_BY_ID',
    SET_STORY_BY_ID = 'stories/SET_STORY_BY_ID',
    FETCH_EDIT_STORY_BY_ID = 'stories/FETCH_EDIT_STORY_BY_ID',
    MAKE_EDIT_STORY_BY_ID = 'stories/MAKE_EDIT_STORY_BY_ID',
    SET_LOADING_STATE = 'stories/SET_LOADING_STATE'
}


//сделать запрос за конкретной историю по ID и установить статус "загрузка"
export interface FetchStoryDataActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.FETCH_STORY_BY_ID
    payload: string
}
export const fetchStoryByIdAC = (payload: string): FetchStoryDataActionInterface => ({
    type: StoryActionsTypes.FETCH_STORY_BY_ID,
    payload
})

//засетать в стейт полученную конкретную историю по ID
interface SetStoryDataByIdActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_STORY_BY_ID
    payload: StoryState['data']
}
export const setStoryByIdAC = (payload: StoryState['data']): SetStoryDataByIdActionInterface => ({
    type: StoryActionsTypes.SET_STORY_BY_ID,
    payload
})

//редактировать историю
export interface FetchEditStoryDataActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.FETCH_EDIT_STORY_BY_ID
    payload: string
}
export const fetchEditStoryAC = (payload: string): FetchEditStoryDataActionInterface => ({
    type: StoryActionsTypes.FETCH_EDIT_STORY_BY_ID,
    payload
})


//установить скатус загрузки
interface SetStoryLoadingStatusActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoryLoadingStatusAC = (payload: LoadingStatus): SetStoryLoadingStatusActionInterface => ({
    type: StoryActionsTypes.SET_LOADING_STATE,
    payload,
});

export type StoryActions =
    | FetchStoryDataActionInterface
    | SetStoryDataByIdActionInterface
    | SetStoryLoadingStatusActionInterface
    | FetchEditStoryDataActionInterface


