import {StoriesApi} from "../../restApi/storiesApi";
import produce from "immer";
import {deleteStoryById, fetchStories} from "./storiesReducer";

const SET_STORY = 'stories/SET_STORY_BY_ID'
const EDIT_STORY = 'stories/EDIT_CURRENT_STORY_BY_ID'
const initialState = {
    data: [],
    isLoaded: true,
    title: '',
    text: ''
}
//для манипуляций над определенной историей, к примеру редактированию
const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STORY: {
            return produce(state, draft => {
                draft.data = action.payload
                draft.isLoaded = false
            })
        }
        case EDIT_STORY: {
            return produce(state, draft => {
                draft.text = action.payload.text
                draft.title = action.payload.title
                draft.isLoaded = true
            })
        }

        default:
            return state
    }
}
export default storyReducer

export const fetchStory = (story) => ({type: SET_STORY, payload: story})
export const editStory = (story) => ({type: EDIT_STORY, payload: story})

//получить конкретную историю по id
export const fetchStoryData = (_id) => (dispatch) => {
    StoriesApi.getStory(_id).then((res) => dispatch(fetchStory(res.data.data)))
}

//редактировать текст сторис
export const editStoryById = (_id) => async (dispatch) => {
    try {
        //получить сторис, которую надобно изменить
        const story = await StoriesApi.getStory(_id)
        //проверяем если она пришла, то идем дальше, иначе оповещаю об ошибке
        if (!story) {
            console.log(story, "Ошибка, сторис не получена, слева ее содержимое")
        }
        //если все-таки экшен прилетел, записываю в стор
        const response = await dispatch(editStory(story.data.data))
        //и если все сработало правильно, и экшен правильный, беру id of story и удаляю ее из базы данных
        if (response.payload._id) {
            console.log('id find, and go to delete')
            StoriesApi.deleteStory(response.payload._id).then((res) => {
                console.log(res.status, "res.status after delete")
                //если удаление прошло успешно, запрашиваю обновленный список стирис,
                //для отображения актуальных данных
                if(res.status === 200) {
                    dispatch(fetchStories())
                }
            })
        }
    } catch (e) {
        //но если вдруг, все-таки у пользователя руки крюки, или я тупонул, выдам ошибку в консоли
        console.log(e, 'Что-то пошло не так, извиняй, ОШИБКА')
    }
}
