import axios from 'axios'
import {Story} from "../store/reducers/story/storyReducer";

interface Response<T> {
    status: string
    data: T
}

interface data {
    title: string
    text: string
}

//запросы для работы с историями
export const StoriesApi = {
    //получить все истории
    async getStories(): Promise<Story[]> {
        const {data} = await axios.get<Response<Story[]>>('/stories')
        return data.data
    },
    //получить конктетную историю
    async getStory(_id: string): Promise<Story> {
        const {data} = await axios.get<Response<Story>>(`/stories/${_id}`)
        return data.data
    },
    //добавить историю
    async addStory(data: data) {
        return axios.post('/stories', {title: data.title, text: data.text}).then(response => response.data)
    },
    //удалить историю
    deleteStory(id: string) {
        return axios.delete(`/stories/${id}`)
    }
}
