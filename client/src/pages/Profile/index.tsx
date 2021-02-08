import React, {useEffect} from "react"
import {useProfileStyles} from "./ProfileStyle"
import ScrollButton from "../../componetns/ScrollButton"
import {useDispatch, useSelector} from "react-redux";
import {
    selectUserData,
    selectUserDataStories,
    selectUserIsAuth,
    selectUserStories
} from "../../store/reducers/users/selectors";
import {FetchAuthAC, FetchUserStoriesAC} from "../../store/reducers/users/actionCreators";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileStories} from "./ProfileStories";
import Grid from '@material-ui/core/Grid'


export const ProfilePage = () => {
    const classes = useProfileStyles();
    const dispatch = useDispatch()

    const userData = useSelector(selectUserData)
    const userIsAuth = useSelector(selectUserIsAuth)
    const stories = useSelector(selectUserStories)
    const isStories = useSelector(selectUserDataStories)

    useEffect(() => {
        if (userIsAuth) {
            dispatch(FetchUserStoriesAC(userData._id))
        } else {
            dispatch(FetchAuthAC())
        }
    }, [])


    return (
        <ScrollButton>
            <div className={classes.wrapper}>
                <Grid container spacing={2}>
                    <ProfileInfo stories={stories} userData={userData}/>
                    <ProfileStories stories={stories} isStories={isStories}/>
                </Grid>
            </div>
        </ScrollButton>
    )
}
