import React from 'react';

import {IconButton, Tooltip} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {ImageObj} from "./AddStoryForm/AddStoryForm";


interface UploadImageProps {
    images: ImageObj[];
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadAvatars: React.FC<UploadImageProps> = ({ images, onChangeImages }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChangeAvatar = React.useCallback((event: Event) => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImages((prev) => [
                    ...prev,
                    {
                        blobUrl: URL.createObjectURL(fileObj),
                        file,
                    },
                ]);
            }
        }
    }, []);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeAvatar);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('change', handleChangeAvatar);
            }
        };
    }, []);

    return (
        <div style={{position: 'absolute', zIndex: 1, marginLeft: '75%'}}>
            {(images.length > 0)
                ? null
                : <IconButton onClick={handleClickImage} color="primary">
                    <Tooltip title='Добавить аватарку' interactive arrow placement='right-start'>
                        <AddCircleIcon style={{ fontSize: 26 }} />
                    </Tooltip>
                  </IconButton>}
            <input ref={inputRef} type="file" id="upload-input" hidden />
        </div>
    );
}
