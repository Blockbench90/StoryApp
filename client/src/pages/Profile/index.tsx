import React, {useEffect} from "react"
import {useProfileStyles} from "./ProfileStyle"
import Grid from '@material-ui/core/Grid'
import ScrollButton from "../../componetns/ScrollButton"
import {useDispatch, useSelector} from "react-redux";
import {
    selectUserData,
    selectUserDataID,
    selectUserIsAuth,
    selectUserStories
} from "../../store/reducers/users/selectors";
import {FetchUserStoriesAC} from "../../store/reducers/users/actionCreators";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileStories} from "./ProfileStories";


export const Index = () => {
    const classes = useProfileStyles();
    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)
    const userIsAuth = useSelector(selectUserIsAuth)
    const stories = useSelector(selectUserStories)
    useEffect(()=>{
        if(userIsAuth) {
            dispatch(FetchUserStoriesAC(userData._id))
        }
    }, [])

    return (
        <ScrollButton>
            <div className={classes.wrapper}>
                <Grid container spacing={1}>
                   <ProfileInfo stories={stories} userData={userData}/>
                   <ProfileStories userIsAuth={userIsAuth} stories={stories} />
                </Grid>
            </div>
        </ScrollButton>
    )
}
