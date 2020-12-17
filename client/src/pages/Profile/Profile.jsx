import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {useProfileStyles} from "./ProfileStyle";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileAvatar from "../../componetns/ProfileAvatar";
import ScrollButton from "../../componetns/ScrollButton";
import ShowMoreText from "react-show-more-text";


export const Profile = () => {
    const classes = useProfileStyles();
    const data = {
        avatar: "https://images.unsplash.com/photo-1578505574290-68739d054931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        username: "Chadi Loualaou",
        lastname: "ChadiLoualaou13",
        status: 'Умная фраза',
        stories: 5,
        followers: 10,
        follow: 10,
        content:
            "puter systxpertise required to fully understand how they work."
    };
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

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
                                <Typography align={"center"} variant="subtitle2" gutterBottom
                                            className={classes.userTag}>
                                    @{data.lastname}
                                </Typography>
                                <Typography className={classes.userName} variant="h6" gutterBottom>
                                    {data.status}
                                </Typography>
                                <div className={classes.infoWrap}>
                                    <Typography className={classes.userName} variant="h4" gutterBottom>
                                        <Typography align={"center"} variant="subtitle2" gutterBottom
                                                    className={classes.userTag}>
                                            Истории:
                                        </Typography>
                                        {data.stories}
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
                            <ShowMoreText
                                /* Default options */
                                lines={5}
                                more='...еще'
                                less='спрятать'
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                onClick={executeOnClick}
                                expanded={false}
                                width={650}>
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            {data.content} {data.content} {data.content} {data.content} {data.content}
                            </ShowMoreText>
                        </Paper>
                        <Paper className={classes.paperRight}>
                            <ShowMoreText
                                /* Default options */
                                lines={5}
                                more='...еще'
                                less='спрятать'
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                onClick={executeOnClick}
                                expanded={false}
                                width={650}>
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                            </ShowMoreText>
                        </Paper>
                        <Paper className={classes.paperRight}>
                            <ShowMoreText
                                /* Default options */
                                lines={5}
                                more='...еще'
                                less='спрятать'
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                onClick={executeOnClick}
                                expanded={false}
                                width={650}>
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                                {data.content} {data.content} {data.content} {data.content} {data.content}
                            </ShowMoreText>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </ScrollButton>
    )
}
