import Paper from "@material-ui/core/Paper";
import {Route} from "react-router-dom";
import {AddStoryForm} from "../../componetns/AddStoryForm/AddStoryForm";
import {ProfileStory} from "../../componetns/ProfileStory";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useProfileStyles} from "./ProfileStyle";
import {Story} from "../../store/reducers/stories/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ProfileStoriesProps {
    isStories: boolean
    stories: Array<Story>
}

export const ProfileStories: React.FC<ProfileStoriesProps> = ({isStories, stories }: ProfileStoriesProps): React.ReactElement => {
    const classes = useProfileStyles()
    const onClose = () => {}
    return (isStories
            ? (
                <Grid item xs={9} sm={12} md={9}>
                    <Paper className={classes.paperRight}>
                        <Route path={'/profile'} exact>
                            <Paper>
                                <div className={classes.addForm}>
                                    <AddStoryForm onClose={onClose}/>
                                </div>
                                <div className={classes.addFormBottomLine}/>
                            </Paper>
                        </Route>
                        {([...stories].reverse().map((story) =>
                            <ProfileStory key={story._id} classes={classes} _id={story._id} title={story.title} images={story.images}
                                          text={story.text} createdAt={story.createdAt}/>
                                          ))
                        }
                    </Paper>
                </Grid>
            )
            : (<div className={classes.storyCentred}>
                <CircularProgress/>
            </div>)

    )
}