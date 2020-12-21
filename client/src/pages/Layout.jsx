import React, {useEffect} from 'react';
import {Container, Grid} from '@material-ui/core';
import {HeaderMenu} from "../componetns/HeaderMenu";
import {useHomeStyles} from "./Home/theme";
import RightSide from "./Home/RightSide";
import {useDispatch} from "react-redux";
import {fetchStoriesAC} from "../store/reducers/stories/actionCreators";


const Layout = ({children}) => {
    const dispatch = useDispatch()
    const classes = useHomeStyles()

    useEffect(() => {
        dispatch(fetchStoriesAC())
    }, [dispatch])

    return (
        <Container maxWidth="lg" className={classes.wrapper}>
            {/*spacing - расстояние между блоками гридов*/}
            <Grid container spacing={2}>
                <Grid xs={18} item>
                    <HeaderMenu classes={classes}/>
                </Grid>

                <Grid xs={11} item>
                    {children}
                </Grid>

                <Grid xs={1} item>
                    <RightSide classes={classes}/>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Layout
