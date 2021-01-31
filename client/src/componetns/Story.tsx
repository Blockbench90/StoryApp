import React from "react"
import {useHistory} from 'react-router-dom'
import classNames from "classnames"

import Grid from "@material-ui/core/Grid"
import {Avatar, IconButton, Typography} from "@material-ui/core"
import CommentIcon from "@material-ui/icons/RateReview"
import RepostIcon from "@material-ui/icons/Repeat"
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined"
import ShareIcon from "@material-ui/icons/OpenInBrowserOutlined"
import Paper from "@material-ui/core/Paper"

import {formatDate} from "../utils/formatDate"
import {useHomeStyles} from "../pages/Home/theme"
// @ts-ignore
import Ava from '../assets/user.png'


interface StoryProps {
    _id: string
    title?: string | undefined
    text: string
    classes: ReturnType<typeof useHomeStyles>
    createdAt: string
    images?: string[]
    user: {
        fullname: string
        username: string
        avatarUrl?: string
    }
}

export const Story: React.FC<StoryProps> = ({_id, title, text, user, images, classes, createdAt}: StoryProps): React.ReactElement => {
    const history = useHistory()

    const handleClickStory = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        history.push(`/home/stories/${_id}`);
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
                            </div>
                            <a className={classes.storyWrapper} onClick={handleClickStory} href={`/home/story/${_id}`}>
                                <Typography variant="subtitle1" align='center' gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {text}
                                </Typography>
                                <div className={classes.imgWrapper}>
                                {images && images.map((url) => <img src={url} key={url}/>  )}
                                </div>
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

