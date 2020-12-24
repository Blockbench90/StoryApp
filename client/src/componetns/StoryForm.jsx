import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import {LoadingStatus} from "../store/types";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";



//компонента для тренировок на React.memo
export const StoryForm = React.memo (({handleClickDoneEdit, handleClickAddStory, handleChangeTextarea,
                                          handleChangeTextareaTitle, textCount, textLimitPercent,
                                          loadingStatus, addFormState, classes, maxRows, title, text, MAX_LENGTH}) => {
    console.log('RENDER MEMO')
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
    )
}, (prevProps, nextProps) => {
    if(prevProps.text && prevProps.title !== nextProps.text && nextProps.title) {
        return false
    } else {
        return true
    }
})