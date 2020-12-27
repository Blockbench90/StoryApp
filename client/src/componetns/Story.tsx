import React, {useState} from "react"
import {useHistory} from 'react-router-dom'
import classNames from "classnames"
import Grid from "@material-ui/core/Grid"
import {Avatar, IconButton, Menu, MenuItem, Typography} from "@material-ui/core"
import CommentIcon from "@material-ui/icons/RateReview"
import RepostIcon from "@material-ui/icons/Repeat"
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined"
import ShareIcon from "@material-ui/icons/OpenInBrowserOutlined"
import Paper from "@material-ui/core/Paper"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {formatDate} from "../utils/formatDate"
import {useDispatch} from "react-redux"
import {deleteStoryByIdAC, fetchEditStoryAC} from "../store/reducers/story/actionCreators"
// @ts-ignore
import Ava from '../assets/som_logo.jpg'
import {useHomeStyles} from "../pages/Home/theme"
import {useProfileStyles} from "../pages/Profile/ProfileStyle";


interface StoryProps {
    _id: string
    title?: string | undefined
    text: string
    classes: ReturnType<typeof useHomeStyles>
    createdAt: string
    user: {
        fullname: string
        username: string
        avatarUrl?: string
    }
}

export const Story: React.FC<StoryProps> = ({_id, title, text, user, classes, createdAt}: StoryProps): React.ReactElement => {
    const dispatch = useDispatch()
    const history = useHistory()

    //для доп-меню
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickStory = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        history.push(`/home/stories/${_id}`);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickEdit = () => {
        dispatch(fetchEditStoryAC(_id))
        handleClose()
    }

    const handleClickDelete = () => {
        dispatch(deleteStoryByIdAC(_id))
        handleClose()
    }

    return (user && (<div>
                <Paper variant="outlined" className={classNames(classes.story, classes.storyHeader)}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <Avatar className={classes.storyAvatar} alt={`Аватарка пользователя`}
                                // прикрутить user.avatarUrl
                                    src={Ava}/>
                        </Grid>
                        <Grid item xs={11}>
                            <div className={classes.storyCon}>
                                <div className={classes.storyHed}>
                                    <Typography><b>{user.fullname}</b>&nbsp;
                                        <span className={classes.storyUserName}>@{user.username}</span>&nbsp;
                                        <span className={classes.storyUserName}>.</span>&nbsp;
                                        <span>{formatDate(new Date(createdAt))}</span>
                                    </Typography>
                                </div>
                                <div>

                                    <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true"
                                                onClick={handleClick}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                    <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open}
                                          onClose={handleClose}>
                                        <MenuItem onClick={handleClickEdit}>
                                            Редактировать
                                        </MenuItem>
                                        <MenuItem onClick={handleClickDelete}>
                                            Удалить
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <a className={classes.storyWrapper} onClick={handleClickStory} href={`/home/story/${_id}`}>
                                <Typography variant="subtitle1" align='center' gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {text}
                                </Typography>
                            </a>
                            <div className={classes.storyFooter}>
                                <div>
                                    <IconButton color='primary'>
                                        <CommentIcon style={{fontSize: 20}}/>
                                    </IconButton>
                                    <span>1</span>
                                </div>
                                <div>
                                    <IconButton color='primary'>
                                        <RepostIcon style={{fontSize: 20}}/>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton color='primary'>
                                        <LikeIcon style={{fontSize: 20}}/>
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton color='primary'>
                                        <ShareIcon style={{fontSize: 20}}/>
                                    </IconButton>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

            </div>
        )
    )
}

