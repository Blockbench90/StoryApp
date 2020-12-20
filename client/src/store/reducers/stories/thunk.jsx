import {StoriesApi} from "../../../restApi/storiesApi";
import {createNewStoryAC, setAllStoriesAC} from "./actionCreators";

//получить все истории
export const fetchStories = () => async (dispatch) => {
    try {
        const stories = await StoriesApi.getStories()
        if(!stories) {
            console.log('Получить все сторисы не удалось, ошибка:', stories)
        }
        dispatch(setAllStoriesAC(stories.data))
    } catch (error) {
        console.log('Не удалось получить истории, ошибка:', error)
    }
}
//добавить новую историю
export const createNewStory = (text) => async (dispatch) => {
    try {
        const story = await StoriesApi.addStory(text)
        if (!story) {
            console.log('Не получается добавить новую историю')
        }
        dispatch(createNewStoryAC(story.data))
        console.log('История добавилась', story.data)
    } catch (error) {
        console.log('Произошла ошибка', error)
    }
}