import React from "react";
import {useHomeStyles} from "../Home/theme";
import ScrollButton from "../../componetns/ScrollButton";
import {Paper} from "@material-ui/core";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ava from '../../assets/som_logo.jpg'

export const Notification: React.FC = (): React.ReactElement => {
    const classes = useHomeStyles()
    const arr = Array.apply(null, Array(30))
    return (
        <ScrollButton>
            <Paper className={classes.notificationWrapper} variant="outlined">
                <div>
                    {(arr.map((item, idx) => (
                        <div key={idx}>
                            <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={ava} />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            style={{ display: 'inline'}}
                                            color="textPrimary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        </div>
                    )))}
                </div>
                <div>
                    {(arr.map((item, idx) => (
                        <div key={idx}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={ava} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                style={{ display: 'inline'}}
                                                color="textPrimary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </div>
                    )))}
                </div>
            </Paper>
        </ScrollButton>
    )
}
