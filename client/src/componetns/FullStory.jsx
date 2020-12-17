import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepostIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ReplyOutlined';
import {Divider, IconButton} from '@material-ui/core';
import {useHomeStyles} from "../pages/Home/theme";
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {fetchStoryData, fetchStory} from "../store/reducers/storyReducer";
import ava from '../assets/som_logo.jpg'
import format from 'date-fns/format'
import ruLang from 'date-fns/locale/ru'
import {Story} from "./Story";


//компонент для отображения полной истории после нажатия на превью в странице Layout
export const FullStory = () => {
    const classes = useHomeStyles();
    const dispatch = useDispatch()
    const {data} = useSelector(({story}) => story)
    const {isLoaded} = useSelector(({story}) => story)
    const params = useParams()
    const id = params.id

    useEffect(() => {
        if (id) {
            dispatch(fetchStoryData(id))
        }
        return () => {
            fetchStory(undefined)
        }
    }, [dispatch, id])

    //если идет загрузка, покажи прелоадер
    if (isLoaded) {
        return <div className={classes.storyCentred}>
            <CircularProgress/>
        </div>
    }

    //если прилители данные, флаг isLoaded установится в false, и будем показывать компонент полной "истории"
    if (data) {
        return (
            <>
                <Paper className={classes.fullStory}>
                    <div className={classNames(classes.storyHeaderUser)}>
                        <Avatar
                            className={classes.storyAvatar}
                            alt={`Аватарка пользователя${data._id}`}
                            src={ava}
                            // src={data.user.avatarUrl}
                        />
                        <Typography>
                            <b>{data.user.fullname}</b>&nbsp;
                            <div>
                                <span className={classes.storyUserName}>@{data.user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={classes.fullStoryText} gutterBottom>
                        {data.text}
                    </Typography>
                    <Typography>
                        {/*Вывожу дату создания в выбранном формате и языке*/}
                        <span
                            className={classes.storyUserName}>{format(new Date(data.createdAt), 'H:mm', {locale: ruLang})} · </span>
                        <span
                            className={classes.storyUserName}>{format(new Date(data.createdAt), 'dd MMM. yyyy г.', {locale: ruLang})}</span>
                    </Typography>
                    <div className={classNames(classes.storyFooter, classes.fullStoryFooter)}>
                        <IconButton>
                            <CommentIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <RepostIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <LikeIcon style={{fontSize: 25}}/>
                        </IconButton>
                        <IconButton>
                            <ShareIcon style={{fontSize: 25}}/>
                        </IconButton>
                    </div>
                </Paper>
                <Divider/>
                <Story
                    _id="1"
                    text="Чисто для пофимания того, как все будет выгляедть"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Петр Петров',
                        username: 'Petron_huhu',
                    }}
                    classes={classes}
                />
                <Story
                    _id="1"
                    text="Чисто для пофимания того, как все будет выгляедть"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Петр Петров',
                        username: 'Petron_huhu',
                    }}
                    classes={classes}
                />
                <Story
                    _id="1"
                    text="Чисто для пофимания того, как все будет выгляедть"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Петр Петров',
                        username: 'Petron_huhu',
                    }}
                    classes={classes}
                />
                <Story
                    _id="1"
                    text="Чисто для пофимания того, как все будет выгляедть"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Петр Петров',
                        username: 'Petron_huhu',
                    }}
                    classes={classes}
                />
            </>)
    }
    return null
}

