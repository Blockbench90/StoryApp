import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom'
import {SignIn} from "./pages/SingIn";
import Layout from "./pages/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "./pages/Profile/Profile";
import {Home} from "./pages/Home/Home";
import {useStylesSignIn} from "./pages/SingIn/theme";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import {CircularProgress} from "@material-ui/core";
import {selectUserIsAuth, selectUserStatus} from "./store/reducers/users/selectors";
import {LoadingStatus} from "./store/types";
import {FetchAuthAC} from "./store/reducers/users/actionCreators";


//TODO: выяснить, почему не компилится когда есть tsconfig, и какого черта он постоянно создается
//подтянуть информацию о пользователе, в общем страница пользователя и подкоректировать бэк
const App = () => {
    const classes = useStylesSignIn()
    const history = useHistory()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectUserIsAuth)
    const loadingStatus = useSelector(selectUserStatus)
    //говорит о полной готовности загрузки
    const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING

    useEffect(() => {
        //запрос на логинизацию
        dispatch(FetchAuthAC());
    }, [dispatch]);

    useEffect(() => {
        //если и дата прилетела и статусы поменялись
        (!isAuth && isReady) ? history.push('/signin') : history.push('/home')
    }, [isAuth, isReady]);

    if (!isReady) {
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
                    <Route path="/profile" component={Profile}/>
                </Layout>
            </Switch>
        </div>
    )
}

export default App;
