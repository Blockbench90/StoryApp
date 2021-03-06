import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom'
import {SignIn} from "./pages/SingIn";
import {Notification} from './pages/Notification/Notification'
import Layout from "./pages/Layout";
import {useSelector} from "react-redux";
import {ProfilePage} from "./pages/Profile";
import {Home} from "./pages/Home/Home";
import {useStylesSignIn} from "./pages/SingIn/theme";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import {CircularProgress} from "@material-ui/core";
import {selectUserStatus} from "./store/reducers/users/selectors";
import {LoadingStatus} from "./store/types";
import {Messages} from './pages/Messages/Messages';
import {Bookmarks} from "./pages/Bookmarks/Bookmarks";
import { io } from "socket.io-client";



const App = () => {
    const classes = useStylesSignIn()
    const history = useHistory()
    const loadingStatus = useSelector(selectUserStatus)

    //говорит к полной готовности загрузки
    const isReady = loadingStatus === LoadingStatus.LOADING
    const token = !!window.localStorage.getItem('token')

    const socket = io()
    console.log(socket)

    useEffect(() => {
        token ? history.push('/home') : history.push('/signin')
    }, [token]);

    if (isReady) {
        return (
            <div className={classes.loadingApp}>
                <ImportContactsOutlinedIcon className={classes.loadingIcon} aria-label="" color="secondary"/>
                <CircularProgress className={classes.loadingStatusBar}/>
            </div>)
    }
    return (
        <div className="App">
            <Switch>
                <Route path="/signin" component={SignIn} exact/>
                <Layout>
                    <Route path="/home" component={Home}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/notification" component={Notification}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/bookmarks" component={Bookmarks}/>
                </Layout>
            </Switch>
        </div>
    )
}

export default App;
