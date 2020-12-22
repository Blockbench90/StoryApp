import {RootState} from "../../store";
import {StoryState} from "./reducer";
import {LoadingStatus} from "../../types";
import {Story} from "../stories/reducer";

//достать из глобального стейта, ветку story
export const selectStoryState = (state: RootState): StoryState => state.story

//достать только что-то конкретное из отдельной ветки глобально стейта, story
export const selectStoryData = (state: RootState): Story | undefined => selectStoryState(state).data;


//достать актуальный статус из стейта
export const selectLoadingStatus = (state: RootState): LoadingStatus => selectStoryState(state).LoadingStatus

//вернуть true | false в зависимости от загрузки
export const selectIsStoryLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;

//вернуть true | false в зависимости от загрузки
export const selectIsStoryLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;

