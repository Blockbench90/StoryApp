import produce, {Draft} from "immer";
import {LoadingStatus} from "../../types";
import {Story} from "../stories/reducer";
import {StoryActions, StoryActionsTypes} from "./actionCreators";


//reducer для отдельно взятой истории
export interface StoryState {
    data?: Story
    LoadingStatus: LoadingStatus
}

const initialStoryState: StoryState = {
    data: undefined,
    LoadingStatus: LoadingStatus.NEVER
}
//для манипуляций над определенной историей, к примеру редактированию
export const storyReducer = produce((draft: Draft<StoryState>, action: StoryActions) => {
    switch (action.type) {
        //установить статус "Загрузка" и очистить data
        case StoryActionsTypes.FETCH_STORY_BY_ID:
            draft.data = undefined
            draft.LoadingStatus = LoadingStatus.LOADING
            break
        //засетать пользователя
        case StoryActionsTypes.SET_STORY_BY_ID:
            draft.data = action.payload
            draft.LoadingStatus = LoadingStatus.LOADED
            break
        //очистить перед редактированием
        case StoryActionsTypes.FETCH_EDIT_STORY_BY_ID:
            draft.data = undefined
            draft.LoadingStatus = LoadingStatus.LOADING
            break

        default:
            break
    }
}, initialStoryState)