import React, {useEffect} from "react"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import {useProfileStyles} from "./ProfileStyle"
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ProfileAvatar from "../../componetns/ProfileAvatar"
import ScrollButton from "../../componetns/ScrollButton"
// @ts-ignore
import {useDispatch, useSelector} from "react-redux";
import {selectUserData, selectUserIsAuth, selectUserStories} from "../../store/reducers/users/selectors";
import {FetchUserStoriesAC} from "../../store/reducers/users/actionCreators";
import {ProfileStory} from "../../componetns/ProfileStory";
import {AddStoryForm} from "../../componetns/AddStoryForm";
import {Route} from "react-router-dom";


export const Profile = () => {
    const classes = useProfileStyles();
    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)
    const userIsAuth = useSelector(selectUserIsAuth)
    //наличие всех историй
    const stories = useSelector(selectUserStories)


    useEffect(()=>{
        if(userIsAuth) {
            // @ts-ignore
            dispatch(FetchUserStoriesAC(userData._id))
            console.log('was render')
        }
    }, [dispatch])


    const data = {
        avatar: "https://images.unsplash.com/photo-1578505574290-68739d054931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        status: 'Умная фраза',
        followers: 10,
        follow: 10
    };

    return (
        <ScrollButton>
            <div className={classes.wrapper}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
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
                                        {stories.length}
                                    </Typography>
                                    <Typography className={classes.userName} variant="h4" gutterBottom>
                                        <Typography align={"center"} variant="subtitle2" gutterBottom
                                                    className={classes.userTag}>
                                            Подписчики:
                                        </Typography>
                                        {data.followers}
                                    </Typography>
                                    <Typography className={classes.userName} variant="h4" gutterBottom>
                                        <Typography align={"center"} variant="subtitle2" gutterBottom
                                                    className={classes.userTag}>
                                            Подвисано на:
                                        </Typography>
                                        {data.follow}
                                    </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paperRight}>
                            <Route path={'/profile'} exact>
                                <Paper>
                                    <div className={classes.addForm}>
                                        <AddStoryForm classes={classes}/>
                                    </div>
                                    <div className={classes.addFormBottomLine}/>
                                </Paper>
                            </Route>
                            {
                                userIsAuth && ([...stories].reverse().map((story)=>
                                            <ProfileStory key={story._id} classes={classes} _id={story._id} title={story.title} text={story.text} createdAt={story.createdAt} />
                                    ))
                            }
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </ScrollButton>
    )
}
