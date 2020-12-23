import {RootState} from "../../store";
import {StoryState} from "./reducer";
import {LoadingStatus} from "../../types";
import {Story} from "../stories/reducer";

//достать из глобального стейта, ветку story
export const selectStoryState = (state: RootState): StoryState => state.story

//достать только что-то конкретное из отдельной ветки глобально стейта, story
export const selectStoryData = (state: RootState): Story | undefined => selectStoryState(state).data;


//достать актуальный статус из стейта
export const selectStoryLoadingStatus = (state: RootState): LoadingStatus => selectStoryState(state).LoadingStatus

//вернуть true | false в зависимости от загрузки
export const selectStoryIsLoading = (state: RootState): boolean => selectStoryLoadingStatus(state) === LoadingStatus.LOADING;

//вернуть true | false в зависимости от загрузки
export const selectStoryIsLoaded = (state: RootState): boolean => selectStoryLoadingStatus(state) === LoadingStatus.LOADED;

