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

export const eventUpload = (e: Event, onChangeImages: (prev: any) => void): void => {
    if (e.target) {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const fileObj = new Blob([file]);
            onChangeImages((prev: any) => [
                ...prev,
                {
                    blobUrl: URL.createObjectURL(fileObj),
                    file,
                },
            ]);
        }
    }
}
