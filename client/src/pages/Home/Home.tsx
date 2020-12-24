import React, {useEffect} from 'react'
import {Paper, Typography} from "@material-ui/core"
import {AddStoryForm} from "../../componetns/AddStoryForm"
import {Story} from "../../componetns/Story"
import CircularProgress from "@material-ui/core/CircularProgress"
import ModalMenu from "../../componetns/ModalMenu"
import BackButton from "../../utils/BackButton"
import {Route} from "react-router-dom"
import {FullStory} from "../../componetns/FullStory"
import {useHomeStyles} from "./theme"
import {useDispatch, useSelector} from "react-redux"
import ScrollButton from "../../componetns/ScrollButton"
import {selectIsStoriesLoaded, selectStoriesItems} from "../../store/reducers/stories/selectors"
import {fetchStoriesAC} from "../../store/reducers/stories/actionCreators"


export const Home: React.FC = (): React.ReactElement => {
    const classes = useHomeStyles()
    const dispatch = useDispatch()
    const stories = useSelector(selectStoriesItems)
    const isLoading = useSelector(selectIsStoriesLoaded)

    useEffect(() => {
        dispatch(fetchStoriesAC())
    }, [dispatch])
    return (
        <ScrollButton>
            <Paper className={classes.storyWrapper} variant="outlined">
                <Paper>
                    <div className={classes.menuHeader}>

                        <div style={{display: 'flex'}}>
                            <Route path="/home/:any">
                                <BackButton/>
                            </Route>

                            <Route path={['/home', '/home/search']} exact>
                                <Paper variant="outlined" className={classes.storyHeader}>
                                    <Typography variant="h6">Главная</Typography>
                                </Paper>
                            </Route>

                            <Route path="/home/stories/:id">
                                <Paper className={classes.storyHeader} style={{marginLeft: -14}}>
                                    <Typography variant="h6">Story</Typography>
                                </Paper>
                            </Route>
                        </div>

                        <div className={classes.modalMenu}>
                            <Paper>
                                <ModalMenu/>
                            </Paper>
                        </div>

                    </div>
                </Paper>

                <Route path={['/home', '/home/search']} exact>
                    <Paper>
                        <div className={classes.addForm}>
                            <AddStoryForm classes={classes}/>
                        </div>
                        <div className={classes.addFormBottomLine}/>
                    </Paper>
                </Route>

                <Route path="/home" exact>
                    {isLoading
                        ? (stories.map((obj) => (
                            <Story key={obj._id} classes={classes} {...obj}/>
                        )))
                        : (<div className={classes.storyCentred}>
                            <CircularProgress/>
                        </div>)}
                </Route>
                <Route path='/home/stories/:id' render={() => <FullStory/>} exact/>
            </Paper>
        </ScrollButton>
    )
}

