import axios from 'axios'
import {Story} from "../store/reducers/stories/storiesReducer";


interface Response<T> {
    status: string
    data: T
}

//запросы для работы с историями
export const StoriesApi = {
    //получить все истории
    async getStories(): Promise<Story[]> {
        const {data} = await axios.get<Response<Story[]>>('/stories')
        console.log(data)
        return data.data
    },
    //получить конктетную историю
    async getStory(_id: string): Promise<Story> {
        const {data} = await axios.get<Response<Story>>(`/stories/${_id}`)
        return data.data
    },
    //добавить историю
    async addStory(postData: any): Promise<any> {
        const data = await axios.post<Response<Story>>('/stories', {title: postData.title, text: postData.text})
        return data
    },
    //удалить историю
    async deleteStory(id: string): Promise<any> {
        const data = await axios.delete<Response<Story>>(`/stories/${id}`)
        return data
    }
}
