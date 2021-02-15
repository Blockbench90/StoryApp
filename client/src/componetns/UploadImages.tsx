import { IconButton } from '@material-ui/core';
import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import {ImageObj} from "./AddStoryForm/AddStoryForm";
import {ImageList} from "./ImageList";
import {useHomeStyles} from "../pages/Home/theme";
import {eventUpload} from "../utils/uploadFile";



interface UploadImageProps {
    images: ImageObj[];
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadImages: React.FC<UploadImageProps> = ({ images, onChangeImages }) => {
    const classes = useHomeStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const removeImage = (url: string) => {
        onChangeImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
    };


    const handleChangeFileInput = React.useCallback((event: Event) => {
        eventUpload(event, onChangeImages)
    }, []);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('change', handleChangeFileInput);
            }
        };
    }, []);

    return (
        <div>
            <ImageList
                images={images.map((obj) => obj.blobUrl)}
                classes={classes}
                removeImage={removeImage}
            />
            {(images.length > 0)
                ? null
                : <IconButton onClick={handleClickImage} color="primary">
                    <ImageOutlinedIcon style={{ fontSize: 26 }} />
                  </IconButton>}
            <input ref={inputRef} type="file" id="upload-input" hidden />
        </div>
    );
};
