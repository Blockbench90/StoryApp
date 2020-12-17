import React from 'react'
import {SearchTextField} from "../../componetns/SearchTextField";
import { InputAdornment, Paper, Typography} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";

const RightSide = ({classes}) => {

    return (

            <div className={classes.rightSide}>
                <SearchTextField
                    variant="outlined"
                    placeholder="Поиск"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
                <Paper className={classes.rightSideBlock}>
                    <Paper className={classes.rightSideBlockHeader} variant="outlined">
                        <b>Топ темы</b>
                    </Paper>
                    <List>
                        <ListItem className={classes.rightSideBlockItem}>
                            <ListItemText
                                primary="Киев"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        Рассказов: 3 331
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem className={classes.rightSideBlockItem}>
                            <ListItemText
                                primary="Рыбак и море"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        Рассказов: 163 122
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem className={classes.rightSideBlockItem}>
                            <ListItemText
                                primary="Как то раз"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        Рассказов: 13 554
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </List>
                </Paper>
                <Paper className={classes.rightSideBlock}>
                    <Paper className={classes.rightSideBlockHeader} variant="outlined">
                        <b>Что почитать?</b>
                    </Paper>
                    <List>
                        <ListItem className={classes.rightSideBlockItem}>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://pbs.twimg.com/profile_images/1267938486566428673/US6KRPbA_normal.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Сусанин"
                                secondary={
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        @IvanSusanin
                                    </Typography>
                                }
                            />
                            <Button color="primary">
                                <PersonAddIcon />
                            </Button>
                        </ListItem>
                        <Divider component="li" />
                    </List>
                </Paper>
            </div>
    )
}
export default RightSide