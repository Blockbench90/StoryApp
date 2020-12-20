import {Story, StoryState} from "./storyReducer";
import {Action} from "redux";
import {LoadingStatus} from "../../types";

//экшены для отдельно взятой истории
export enum StoryActionsTypes {
    FETCH_STORY_BY_ID = 'stories/SET_STORY_BY_ID',
    EDIT_STORY = 'stories/EDIT_CURRENT_STORY_BY_ID',
    CLEAR_STORY = 'stories/CLEAR_STORY',
    SET_LOADING_STATE = 'stories/SET_LOADING_STATE'
}

//Получить конкретную историю по ID
interface FetchStoryDataActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.FETCH_STORY_BY_ID
    payload: StoryState['data']
}
export const fetchStoryAC = (payload: StoryState['data']): FetchStoryDataActionInterface => ({
    type: StoryActionsTypes.FETCH_STORY_BY_ID,
    payload
})

//редактировать историю
interface EditStoryDataActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.EDIT_STORY
    payload: Story;
}
export const editStoryAC = (payload: Story): EditStoryDataActionInterface => ({
    type: StoryActionsTypes.EDIT_STORY,
    payload
})
//"удалить историю" не нуждается в экшене

//установить скатус загрузки
interface SetStoryLoadingStatusActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export const setStoryLoadingStatusAC = (payload: LoadingStatus): SetStoryLoadingStatusActionInterface => ({
    type: StoryActionsTypes.SET_LOADING_STATE,
    payload,
});
//очистить редьюсер после окончания редактирования
interface ClearStoryLoadingStatusActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.CLEAR_STORY
}
export const clearStoryAC = (): ClearStoryLoadingStatusActionInterface => ({
    type: StoryActionsTypes.CLEAR_STORY})

export type StoryActions =
    | FetchStoryDataActionInterface
    | EditStoryDataActionInterface
    | SetStoryLoadingStatusActionInterface
    | ClearStoryLoadingStatusActionInterface

