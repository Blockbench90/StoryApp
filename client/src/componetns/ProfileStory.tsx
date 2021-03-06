import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import classNames from "classnames"
import {Emoji} from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import Grid from "@material-ui/core/Grid"
import {IconButton, Menu, MenuItem, Typography} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from "@material-ui/icons/RateReview";
import RepostIcon from "@material-ui/icons/Repeat";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";

import {formatDate} from "../utils/formatDate"
import {deleteStoryByIdAC, fetchEditStoryAC} from "../store/reducers/story/actionCreators"
import {useProfileStyles} from "../pages/Profile/ProfileStyle"
import {selectUserDataID} from "../store/reducers/users/selectors";


interface ProfileStoryProps {
    _id: string
    title?: string | undefined
    text: string
    images?: string[]
    classes: ReturnType<typeof useProfileStyles>
    createdAt: string
}

export const ProfileStory: React.FC<ProfileStoryProps> = ({_id, title, text, classes,
                                                              images, createdAt }: ProfileStoryProps): React.ReactElement => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserDataID)
    const [show, setShow] = useState<boolean>(true)
    //для доп-меню
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)


    const showHiddenText = (): void => {
        setShow((show)=> !show)
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickEdit = () => {
        dispatch(fetchEditStoryAC(_id))
        handleClose()
    }

    const handleClickDelete = () => {
        dispatch(deleteStoryByIdAC({_id, userId}))
        handleClose()
    }

    return (
        <div className={show ? classes.storyWrapperHide : classes.storyWrapper}>
            <Paper variant="outlined" className={classNames(classes.story, classes.storyHeader)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>

                        <div className={classes.storyCon}>

                            <div className={classes.storyHed}>
                                <Typography><b>@</b>&nbsp;
                                    <span className={classes.storyUserName}>Создано</span>&nbsp;
                                    <span>{formatDate(new Date(createdAt))}</span>&nbsp;
                                    <span className={classes.storyUserName}>назад</span>&nbsp;
                                </Typography>
                            </div>

                            <div>
                                <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true"
                                            onClick={handleClick}>
                                    <MoreVertIcon/>
                                </IconButton>

                                <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} variant='selectedMenu'
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

                        <div onClick={showHiddenText}>

                            <Typography variant="subtitle1" align='center' gutterBottom>
                                {title}
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                {text && (
                                    <span>
                                        {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                            <Emoji key={i} emoji={match} set="apple" size={16}/>
                                        ))}
                                    </span>
                                )}
                            </Typography>

                            <div className={classes.imgWrapper}>
                                {images && images.map((url) => <img alt={url} src={url} key={url}/>)}
                            </div>

                        </div>
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
}

