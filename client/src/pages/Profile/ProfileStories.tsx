import Paper from "@material-ui/core/Paper";
import {Route} from "react-router-dom";
import {AddStoryForm} from "../../componetns/AddStoryForm";
import {ProfileStory} from "../../componetns/ProfileStory";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {useProfileStyles} from "./ProfileStyle";
import {Story} from "../../store/reducers/stories/reducer";

interface ProfileStoriesProps {
    // classes: ReturnType<typeof useProfileStyles>
    userIsAuth: boolean
    stories: Array<Story>
}

export const ProfileStories: React.FC<ProfileStoriesProps> = ({ userIsAuth, stories}: ProfileStoriesProps): React.ReactElement => {
    const classes = useProfileStyles()
    return (
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
    )
}