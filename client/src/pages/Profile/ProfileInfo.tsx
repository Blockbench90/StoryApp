import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ProfileAvatar from "../../componetns/ProfileAvatar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useProfileStyles} from "./ProfileStyle";
import {Story} from "../../store/reducers/stories/reducer";
import {User} from "../../store/reducers/users/reducer";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import CreateIcon from "@material-ui/icons/Create";

interface ProfileInfoProps {
    stories: Array<Story>
    userData: User
}


export const ProfileInfo: React.FC<ProfileInfoProps> = ({userData, stories}: ProfileInfoProps): React.ReactElement => {
    const classes = useProfileStyles()
    let countStories: number = 0
    const data = {
        avatar: "https://images.unsplash.com/photo-1578505574290-68739d054931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        status: 'Умная фраза',
        followers: 10,
        follow: 10
    }
    if(stories !== undefined){
        countStories = stories.length
    }
    const logout = () => {
        window.localStorage.removeItem('token')
    }
    if(!window.localStorage.getItem('token')){
        return null
    }
    return (
        <Grid item xs={3}>
            <Paper className={classes.paperLeft}>
                <Avatar variant="rounded" className={classes.profileImage}>
                    <ProfileAvatar/>
                </Avatar>

                <div className={classes.profileInfoContainer}>
                    <Typography align={"center"} variant="subtitle2" gutterBottom className={classes.userTag}>
                        @{userData?.fullname}
                    </Typography>

                    <Typography className={classes.userName} variant="h6" gutterBottom>
                        {data.status}
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
                            {data.followers}
                        </Typography>
                        <Typography className={classes.userName} variant="h4" gutterBottom>
                            <Typography align={"center"} variant="subtitle2" gutterBottom
                                        className={classes.userTag}>
                                Отслеживаю:
                            </Typography>
                            {data.follow}
                        </Typography>
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
                            <CreateIcon/>
                        </Hidden>
                    </Button>
                </div>
            </Paper>
        </Grid>)
}