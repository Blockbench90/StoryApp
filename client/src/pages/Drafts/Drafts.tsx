import React from "react";
import {useHomeStyles} from "../Home/theme";
import ScrollButton from "../../componetns/ScrollButton";
import {Paper} from "@material-ui/core";

export const Drafts: React.FC = (): React.ReactElement => {
    const classes = useHomeStyles()

    return (
        <ScrollButton>
            <Paper className={classes.storyWrapper} variant="outlined">
                Drafts
            </Paper>
        </ScrollButton>
    )
}
