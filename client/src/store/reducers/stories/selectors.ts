import {AddFormState, StoriesState} from "./reducer";
import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {selectUserState} from "../users/selectors";
//достать из глобального стейта, ветку stories
export const selectStoriesState = (state: RootState): StoriesState => state.stories

//достать актуальный статус из стейта
export const selectLoadingStatus = (state: RootState): LoadingStatus => selectStoriesState(state).LoadingStatus

//достать актуальный статус добавления истории через форму заполнения
export const selectAddFormState = (state: RootState): AddFormState => selectStoriesState(state).addFormState

//вернуть true | false в зависимости от загрузки
export const selectIsStoriesLoading = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADING;

//вернуть true | false в зависимости от загрузки
export const selectIsStoriesLoaded = (state: RootState): boolean => selectLoadingStatus(state) === LoadingStatus.LOADED;

//достать только items из отдельной ветки глобально стейта, stories
export const selectStoriesItems = (state: RootState) => selectStoriesState(state).items;

//булево значинеи, наличия данных в историях юзера
export const selectStoriesIsItems = (state: RootState): boolean => !!selectStoriesState(state).items
