import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import classNames from 'classnames'

import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined'
import {Alert} from "@material-ui/lab"

import {fetchAddStoryAC, fetchStoriesAC, setAddFormStateAC} from "../../store/reducers/stories/actionCreators"
import {selectStoryData, selectStoryLoadingStatus} from "../../store/reducers/story/selectors"
import {selectAddFormState} from "../../store/reducers/stories/selectors"
import {clearStoryDataAfterEditAC} from "../../store/reducers/story/actionCreators"
import {LoadingStatus} from "../../store/types"
import {AddFormState, NewStory} from "../../store/reducers/stories/reducer";
import {selectUserDataID} from "../../store/reducers/users/selectors";
import {FetchUserStoriesAC} from "../../store/reducers/users/actionCreators";
import {useAddFormStyles} from "./addStoryStyles";
import {UploadImages} from "../UploadImages";
import {uploadFile} from '../../utils/uploadFile'

import 'emoji-mart/css/emoji-mart.css'
import {Emoji, Picker} from 'emoji-mart'


import girl from "../../assets/gerl.jpg"
import reactStringReplace from "react-string-replace";


interface AddStoryFormProps {
    onClose?: () => void
    maxRows?: number
}
export interface ImageObj {
    blobUrl: string
    file: File
}

const MAX_LENGTH = 3000;

export const AddStoryForm: React.FC<AddStoryFormProps> = ({maxRows, onClose}: AddStoryFormProps): React.ReactElement => {
    const classes = useAddFormStyles()
    const dispatch = useDispatch()

    const addFormState = useSelector(selectAddFormState)
    const story = useSelector(selectStoryData)
    const loadingStatus = useSelector(selectStoryLoadingStatus)
    const userId = useSelector(selectUserDataID)

    const [title, setTitle] = React.useState<string | undefined>('')
    const [text, setText] = React.useState<string>('')
    const [images, setImages] = React.useState<ImageObj[]>([])

    const [showPicker, setShowPicker] = React.useState<boolean>(false)


    const textCount = MAX_LENGTH - text.length;
    const textLimitPercent = Math.round((text.length / 3000) * 100);

    const toggleShowPicker = ():void => {
        setShowPicker((showPicker) => !showPicker)
    }

    useEffect(() => {
        if (story) {
            if (story.title !== title && story.text !== text) {
                setTitle(story.title)
                setText(story.text)
            }
        }
    }, [story])

    const addNewEmoji = (e: any): void => {
            setText((text + '' + e.native).trim())
    }

    const handleChangeTextareaTitle = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            setTitle(e.currentTarget.value);
        }
    };
    const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    //добавление истории
    const handleClickAddStory = async (): Promise<void> => {
        let result = [];
        dispatch(setAddFormStateAC(AddFormState.LOADING));
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file;
            const { url } = await uploadFile(file);
            result.push( url);
        }
        //собрать данные из локального стора и отправить в базу
        const data: NewStory = {title, text, images: result}
        console.log('Data сразу после запроса в форме добавления =', data)
        dispatch(fetchAddStoryAC(data))
        //обнулить локально
        setTitle('')
        setText('')
        setImages([])
        //обнулить в глобальном сторе
        dispatch(clearStoryDataAfterEditAC())
        dispatch(FetchUserStoriesAC(userId))
        onClose()
    };

    //редактировать
    const handleClickDoneEdit = (): void => {
        handleClickAddStory()
        //обновить список историй, чтобы избежать дублирования
        dispatch(fetchStoriesAC())
        dispatch(FetchUserStoriesAC(userId))
    }

    return (
        <div>
            <div className={classes.addFormBody}>
                <div>
                    <Avatar
                        className={classes.storyAvatar}
                        alt={`Аватарка пользователя UserAvatar`}
                        src={girl}
                    />
                </div>
                <div className={classes.addFormTextareaWrapper}>
                    <TextareaAutosize
                        onChange={handleChangeTextareaTitle}
                        className={classes.addFormTextareaTitle}
                        placeholder="Заголовок..."
                        value={title}
                        rowsMax={maxRows}
                    />
                    <TextareaAutosize
                        onChange={handleChangeTextarea}
                        className={classes.addFormTextarea}
                        placeholder="Рассказываете..."
                        value={text}
                        rowsMax={maxRows}
                    />
                </div>
            </div>
            <div className={classes.addFormBottom}>
                <div className={classNames(classes.storyFooterLine, classes.addFormBottomActions)}>

                    <UploadImages images={images} onChangeImages={setImages}/>

                    <IconButton color="primary" onClick={toggleShowPicker}>
                        <EmojiIcon style={{fontSize: 26}}/>
                    </IconButton>
                    {
                        showPicker &&
                    <Picker set='apple' style={{ position: 'absolute', top: '145px', left: '140px' }} title="Story"
                            onSelect={ emoji => addNewEmoji(emoji)}
                            i18n={{ search: 'Поиск', notfound:'Эмоций не найдено...',
                                categories: { search: 'А такого нет...', recent: 'Любимые', people: 'Люди', nature: 'Животные', foods: 'Еда', activity: 'Активность',
                                    places: 'Места', objects: 'Обьекты', symbols: 'Символы', flags: 'Флаги', custom: 'Custom'} }}/>
                    }

                </div>
                <div className={classes.addFormBottomRight}>
                    {text && (
                        <>
                            <span>{textCount}</span>
                            <div className={classes.addFormCircleProgress}>
                                <CircularProgress
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}
                                />
                                <CircularProgress
                                    style={{color: 'rgba(0, 0, 0, 0.1)'}}
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    {loadingStatus === LoadingStatus.REDACTION
                        ? (<Button
                            onClick={handleClickDoneEdit}
                            disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
                            color="primary"
                            variant="contained">
                            {addFormState === AddFormState.LOADING
                                ? (<CircularProgress color="inherit" size={16}/>)
                                : ('Готово')
                            }
                        </Button>)
                        : (<Button
                                onClick={handleClickAddStory}
                                disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
                                color="primary"
                                variant="contained">
                                {addFormState === AddFormState.LOADING
                                    ? (<CircularProgress color="inherit" size={16}/>)
                                    : ('Опубликовать')}
                            </Button>
                        )}
                </div>
            </div>
            {addFormState === AddFormState.ERROR && (
                <Alert severity="error">Ошибка при добавлении{' '}<span aria-label="emoji-plak"
                                                                        role="img">!</span></Alert>
            )}
        </div>
    );
};

