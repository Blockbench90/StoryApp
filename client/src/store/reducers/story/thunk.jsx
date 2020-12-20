import {StoriesApi} from "../../../restApi/storiesApi";
import {editStoryAC, fetchStoryAC} from "./actionCreators";
import {fetchStories} from "../stories/thunk";

//санка для отдельно взятой истории

//получить конкретную историю по id
export const fetchStoryDataById = (_id) => async (dispatch) => {
    try {
        const story = await StoriesApi.getStory(_id)
        if (!story) {
            return console.log(story, 'Получение истории пошло не по плану!')
        }
        dispatch(fetchStoryAC(story.data.data))
    } catch (error) {
        console.log('Произошла ошибка!', error)
    }
}
//редактировать текст сторис
export const editStoryById = (_id) => async (dispatch) => {
    try {
        //получить сторис, которую надобно изменить
        const story = await StoriesApi.getStory(_id)
        //проверяем если она пришла, то идем дальше, иначе оповещаю об ошибке
        if (!story) {
            console.log("Ошибка, сторис не получена", story)
        }
        //если все-таки экшен прилетел, записываю в стор
        const response = await dispatch(editStoryAC(story.data.data))
        //и если все сработало правильно, и экшен правильный,
        // беру id of story и удаляю ее из базы данных
        if (response.payload._id) {
            console.log('id find, and go to delete')
            const result = await StoriesApi.deleteStory(response.payload._id)
            //если удаление прошло успешно, запрашиваю обновленный список стирис,
            //для отображения актуальных данных
            if (result.status === 200) {
                dispatch(fetchStories())
            }
        }
    } catch (error) {
        //но если вдруг, все-таки у пользователя руки крюки, или я тупонул, выдам ошибку в консоли
        console.log('Что-то пошло не так, извиняй, ОШИБКА', error)
    }
}
//удалить историю
export const deleteStoryById = (id) => async (dispatch) => {
    //передать данные для удаления, тоесть по ID
    const response = StoriesApi.deleteStory(id)
    console.log(res.status, "res.status after delete")
    //если ответ придет со статус кодом 200
    //обновить список историй
    if (response.status === 200) {
        dispatch(fetchStories())
    }
}

