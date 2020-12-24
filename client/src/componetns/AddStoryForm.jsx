import React, {useEffect} from 'react';
import classNames from 'classnames';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import {useDispatch, useSelector} from "react-redux";
import {fetchAddStoryAC, fetchStoriesAC} from "../store/reducers/stories/actionCreators";
import {selectStoryData, selectStoryLoadingStatus} from "../store/reducers/story/selectors";
import {selectAddFormState} from "../store/reducers/stories/selectors";
import {Alert} from "@material-ui/lab";
import {clearStoryDataAfterEditAC} from "../store/reducers/story/actionCreators";
import {LoadingStatus} from "../store/types";



const MAX_LENGTH = 3000;

export const AddStoryForm = ({classes, maxRows}) => {
    const [title, setTitle] = React.useState('')
    const [text, setText] = React.useState('')

    const textCount = MAX_LENGTH - text.length;
    const textLimitPercent = Math.round((text.length / 3000) * 100);

    const dispatch = useDispatch()
    const addFormState = useSelector(selectAddFormState)
    const story = useSelector(selectStoryData)
    const loadingStatus = useSelector(selectStoryLoadingStatus)


    useEffect(() => {
        if( story ) {
            if(story.title !== title && story.text !== text) {
                console.log('in UseEffect')
                setTitle(story.title)
                setText(story.text)
            }
        }
    }, [story])


    const handleChangeTextareaTitle = (e) => {
        if (e.currentTarget) {
            setTitle(e.currentTarget.value);
        }
    };
    const handleChangeTextarea = (e) => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    //добавление истории
    const handleClickAddStory = () => {
        //собрать данные из локального стора и отправить в базу
        const data = {title, text}
        dispatch(fetchAddStoryAC(data))
        //обнулить локально
        setTitle('')
        setText('')
        //обнулить в глобальном сторе
        dispatch(clearStoryDataAfterEditAC())
    };

    //редактировать
    const handleClickDoneEdit = () => {
        handleClickAddStory()
        //обновить список историй, чтобы избежать дублирования
        dispatch(fetchStoriesAC())
    }

    return (
        <div>
            <div className={classes.addFormBody}>
                <div>
                    <Avatar
                        className={classes.storyAvatar}
                        alt={`Аватарка пользователя UserAvatar`}
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    />
                </div>
                <div className={classes.addFormTextareaWrapper}>
                    <TextareaAutosize
                        onChange={handleChangeTextareaTitle}
                        className={classes.addFormTextareaTitle}
                        placeholder="Введите имя произвидения..."
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
                <div className={classNames(classes.storyFooter, classes.addFormBottomActions)}>
                    <IconButton color="primary">
                        <ImageOutlinedIcon style={{fontSize: 26}}/>
                    </IconButton>
                    <IconButton color="primary">
                        <EmojiIcon style={{fontSize: 26}}/>
                    </IconButton>
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
                            disabled={addFormState === addFormState.LOADING || !text || text.length >= MAX_LENGTH}
                            color="primary"
                            variant="contained">
                            {addFormState === addFormState.LOADING
                                ? (<CircularProgress color="inherit" size={16} />)
                                : ('Готово')
                            }
                        </Button>)
                        : (<Button
                                onClick={handleClickAddStory}
                                disabled={addFormState === addFormState.LOADING || !text || text.length >= MAX_LENGTH}
                                color="primary"
                                variant="contained">
                                {addFormState === addFormState.LOADING
                                    ? (<CircularProgress color="inherit" size={16} />)
                                    : ('Опубликовать')}
                            </Button>
                        )}
                </div>
            </div>
            {addFormState === addFormState.ERROR && (
                <Alert severity="error">Ошибка при добавлении{' '}<span aria-label="emoji-plak" role="img">!</span></Alert>
            )}
        </div>
    );
};

