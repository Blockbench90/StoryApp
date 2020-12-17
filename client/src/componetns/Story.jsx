import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import {Avatar, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/RateReview";
import RepostIcon from "@material-ui/icons/Repeat";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/OpenInBrowserOutlined";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {formatDate} from "../utils/formatDate";
import Ava from '../assets/som_logo.jpg'
import {useDispatch} from "react-redux";
import {deleteStoryById} from "../store/reducers/storiesReducer";
import {editStoryById} from "../store/reducers/storyReducer";

export const Story = ({_id, title, text, user, classes, createdAt}) => {
    const dispatch = useDispatch()
    //для доп-меню
    const [anchorEl, setAnchorEl] = useState(null);
    const open = (anchorEl);
    const history = useHistory();

    const handleClickStory = (event) => {
        event.preventDefault();
        history.push(`/home/stories/${_id}`);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const editStoryOnClick = () => {
        dispatch(editStoryById(_id))
        handleClose()
    }

    const handleClickRedaction = () => {
        console.log('нажата кнопка для удаления стирис')
        dispatch(deleteStoryById(_id))
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
                                        <MenuItem onClick={editStoryOnClick}>
                                            Редактировать
                                        </MenuItem>
                                        <MenuItem onClick={handleClickRedaction}>
                                            Удалить твит
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

