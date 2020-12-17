import React, {useEffect} from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import {useDispatch, useSelector} from "react-redux";
import {createNewStoryData} from "../store/reducers/storiesReducer";


const MAX_LENGTH = 3000;

export const AddStoryForm = ({classes, maxRows,}) => {
    const dispatch = useDispatch()
    const story = useSelector(({story}) => story)
    const [title, setTitle] = React.useState('')
    const [text, setText] = React.useState('')
    const textLimitPercent = Math.round((text.length / 3000) * 100);
    const textCount = MAX_LENGTH - text.length;
    //обновить компонент, если текст изменился
    useEffect(() => {
        console.log(story)
        if (text !== story.text) {
            console.log(story.text, 'story text')
            setTitle(story.title)
            setText(story.text)
        }
    }, [story.text, story.title])

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

    const handleClickAddStory = () => {
        // setData({title, text})
        dispatch(createNewStoryData({title, text}))
        // console.log(data, 'Текст после нажатия кнопки в форме добаления')
        setTitle('')
        setText('')
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                <Avatar
                    className={classes.storyAvatar}
                    alt={`Аватарка пользователя UserAvatar`}
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
                <div>

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
                    <Button
                        onClick={handleClickAddStory}
                        disabled={!text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained">
                        Опубликовать
                    </Button>
                </div>
            </div>
        </div>
    );
};
