import axios from 'axios'

interface UploadFileReturnProps {
    height: number
    size: number
    url: string
    width: number
}

export const uploadFile = async (image: File): Promise<UploadFileReturnProps> => {
    const formData = new FormData()
    formData.append('image', image)

    const {data} = await axios.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}