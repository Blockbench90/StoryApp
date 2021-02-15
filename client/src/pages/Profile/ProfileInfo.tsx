// @ts-nocheck
import React from "react";
import {useHistory} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from "@material-ui/core/Typography";

import {useProfileStyles} from "./ProfileStyle";
import {Story} from "../../store/reducers/stories/reducer";
import {User} from "../../store/reducers/users/reducer";
import {ProfileAvatar} from "./ProfileAvatar";

interface ProfileInfoProps {
    stories: Array<Story>
    userData: User
}


export const ProfileInfo: React.FC<ProfileInfoProps> = ({userData, stories}) => {
    const classes = useProfileStyles()
    const history = useHistory()

    let countStories: number = 0

    if(stories !== undefined){
        countStories = stories.length
    }

    const logout = () => {
        window.localStorage.removeItem('token')
        history.push('/signin')
    }

    return (
        <Grid item xs={3} sm={12} md={3}>
            <Paper className={classes.paperLeft}>

                <Avatar variant="rounded" className={classes.profileImage}>
                    <ProfileAvatar profileAvatar={userData?.profileAvatar}/>
                </Avatar>

                <div className={classes.profileInfoContainer}>
                    <Typography align={"center"} variant="subtitle2" gutterBottom className={classes.userTag}>
                        @{userData?.fullname}
                    </Typography>

                    <Typography className={classes.userName} variant="h6" gutterBottom>
                        "some status"
                    </Typography>
                    <div className={classes.infoWrap}>
                        <Typography className={classes.userName} variant="h4" gutterBottom>
                            <Typography align={"center"} variant="subtitle2" gutterBottom className={classes.userTag}>
                                Историй:
                            </Typography>
                            {countStories}
                        </Typography>
                        <Typography className={classes.userName} variant="h4" gutterBottom>
                            <Typography align={"center"} variant="subtitle2" gutterBottom
                                        className={classes.userTag}>
                                Подписаны:
                            </Typography>
                            10
                        </Typography>
                        <Typography className={classes.userName} variant="h4" gutterBottom>
                            <Typography align={"center"} variant="subtitle2" gutterBottom
                                        className={classes.userTag}>
                                Отслеживаю:
                            </Typography>
                            10
                        </Typography>
                    </div>

                </div>

                <Button
                    onClick={logout}
                    className={classes.logoutButton}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size='large'>
                    <Hidden smDown>Выйти</Hidden>
                    <Hidden mdUp>
                        <CancelIcon/>
                    </Hidden>
                </Button>
            </Paper>

        </Grid>)
}