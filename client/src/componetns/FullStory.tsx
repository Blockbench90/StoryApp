import React, {useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import RepostIcon from '@material-ui/icons/RepeatOutlined'
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ShareIcon from '@material-ui/icons/ReplyOutlined'
import {Divider, IconButton} from '@material-ui/core'
import {useHomeStyles} from "../pages/Home/theme"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import format from 'date-fns/format'
import ruLang from 'date-fns/locale/ru'
import {Story} from "./Story"
import {fetchStoryByIdAC, setStoryByIdAC, setStoryLoadingStatusAC} from "../store/reducers/story/actionCreators"
import {selectStoryIsLoaded, selectStoryState} from "../store/reducers/story/selectors"
import {LoadingStatus} from "../store/types"
// @ts-ignore
import ava from '../assets/som_logo.jpg'
// @ts-ignore
import mediumZoom from "medium-zoom"



//компонент для отображения полной истории после нажатия на превью в странице Layout
export const FullStory: React.FC = (): React.ReactElement | null => {
    const classes = useHomeStyles();
    const dispatch = useDispatch()

    const {data} = useSelector(selectStoryState)
    const isLoaded = useSelector(selectStoryIsLoaded)

    const params: {id?: string} = useParams()
    const id = params.id

    useEffect(() => {
        if (id) {
            dispatch(fetchStoryByIdAC(id))
        }
        return () => {
            dispatch(setStoryByIdAC(undefined))
            dispatch(setStoryLoadingStatusAC(LoadingStatus.NEVER))
        }
    }, [dispatch, id])

    mediumZoom('.imgWrapper img')

    //если идет загрузка, покажи прелоадер
    if (!isLoaded) {
        return <div className={classes.storyCentred}>
            <CircularProgress/>
        </div>
    }

    //если прилители данные, флаг isLoaded установится в true, загрузка завершена, покажу компонент полной "истории"
    if (data) {
        // @ts-ignore
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
                    <Typography variant="h4" align='center' gutterBottom>
                        {data.title}
                    </Typography>
                    <Typography className={classes.fullStoryText} gutterBottom>
                        {data.text}
                    </Typography>
                    <div className={classes.imgWrapper}>
                        {data.images && data.images.map((url) => <img src={url} key={url} className='dataZoomable'/>  )}
                    </div>
                    <Typography>
                        {/*Вывожу дату создания в выбранном формате и языке*/}
                        <span
                            className={classes.storyUserName}>{format(new Date(data.createdAt), 'H:mm', {locale: ruLang})} · </span>
                        <span
                            className={classes.storyUserName}>{format(new Date(data.createdAt), 'dd MMM. yyyy г.', {locale: ruLang})}</span>
                    </Typography>
                    <div className={classNames(classes.storyFooter, classes.fullStoryFooter)}>
                        <IconButton>
                            <CommentIcon className={classes.fullStoryIcon}/>
                        </IconButton>
                        <IconButton>
                            <RepostIcon className={classes.fullStoryIcon}/>
                        </IconButton>
                        <IconButton>
                            <LikeIcon className={classes.fullStoryIcon}/>
                        </IconButton>
                        <IconButton>
                            <ShareIcon className={classes.fullStoryIcon}/>
                        </IconButton>
                    </div>
                </Paper>
                <Divider/>
                <Story
                    _id="1"
                    text="А что, мне понравилась,  1f923😁 забавно"
                    createdAt={new Date().toString()}
                    user={{
                        fullname: 'Петр Петров',
                        username: 'Petron_huhu'
                    }}
                    classes={classes}
                />
            </>)
    }
    return null
}

