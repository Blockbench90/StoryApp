import {Action} from "redux";
import {StoryState} from "../storyReducer";


export enum StoryActionsTypes {
    SET_STORY = 'stories/SET_STORY_BY_ID',
    EDIT_STORY = 'stories/EDIT_CURRENT_STORY_BY_ID',
    CLEAR_STORY = 'stories/CLEAR_STORY'
}

export interface FetchStoryDataActionInterface extends Action<StoryActionsTypes> {
    type: StoryActionsTypes.SET_STORY
    payload: StoryState['data']
}
