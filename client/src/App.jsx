import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom'
import {SignIn} from "./pages/SingIn";
import Layout from "./pages/Layout";
import {UserApi} from "./restApi/userApi";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe} from "./store/reducers/userReducer";
import {Profile} from "./pages/Profile/Profile";
import {Home} from "./pages/Home/Home";
import {useStylesSignIn} from "./pages/SingIn/theme";

const App = () => {
    console.log('app render')
    const classes = useStylesSignIn()
    const history = useHistory()
    const dispatch = useDispatch()
    const data = useSelector(({user}) => user)
    const isAuth = useSelector(({user}) => user.isAuth)
    console.log(isAuth, data)

    //при первой загрузке, проверять пользователя по токену
    const checkUserAuth = async () => {
        try {
            const data = await UserApi.getMe()
            dispatch(fetchAuthMe(data.data))
        } catch (error) {
            console.log(error, "Ошибка логинизации")
        }
    }

    //если пользователь залогинен, редиректить на главную
    React.useEffect(() => {
        checkUserAuth()
    }, [])

    //проверка логинизации, если есть, на главную,
    //если нет токена, оставить на странице регистрации
    React.useEffect(() => {
        isAuth ? history.push('/home') : history.push('/signin')
    }, [isAuth])
    //TODO: пофиксить багу с отображением страниц
    // if(!isAuth){
    //     return <div className={classes.loadingApp}>
    //         <ImportContactsOutlinedIcon className={classes.loadingIcon} aria-label=""
    //                                     color="secondary"/>
    //         <CircularProgress className={classes.loadingCircul}/>
    //     </div>
    // }
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
