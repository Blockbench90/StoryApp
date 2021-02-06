import React, {useState} from 'react'

import {Button, Typography} from '@material-ui/core'
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined'

import LoginModal from "./components/LoginModal"
import RegistrationModal from "./components/RegistrationModal"

import {useStylesSignIn} from "./theme";
import {useSelector} from "react-redux";
import {selectUserStatus} from "../../store/reducers/users/selectors";


export const SignIn: React.FC = (): React.ReactElement => {
    const classes = useStylesSignIn();
    const loadingStatus = useSelector(selectUserStatus)
    console.log(loadingStatus)
    const [visibleModal, setVisibleModal] = useState<'signIn' | 'signUp'>();

    //для входа
    const handleClickOpenSignIn = (): void => {
        setVisibleModal('signIn');
    };
    //для регистрации
    const handleClickOpenSignUp = (): void => {
        setVisibleModal('signUp');
    };
    //для закрытия
    const handleCloseModal = (): void => {
        setVisibleModal(undefined);
    };

    return (
        <div className={classes.wrapper}>

            <section className={classes.leftSide}>
                <ImportContactsOutlinedIcon color="primary" className={classes.leftSideBigIcon}/>
            </section>

            {/*БЛОК "ЗАГОЛОВКОВ"*/}
            <section className={classes.loginSide}>
                <div className={classes.loginSideWrapper}>

                    <ImportContactsOutlinedIcon color="primary" className={classes.loginSideStoryIcon}/>
                    <Typography className={classes.loginSideTitle} gutterBottom variant="h4">
                        Услышал от деда, мамы, дяди, тети...</Typography>
                    <Typography className={classes.loginSubTitle}>
                        <b>Не храни это в себе, поделись!</b></Typography>

                    <Button onClick={handleClickOpenSignUp} style={{marginBottom: 20}}
                            variant="contained" color="primary" fullWidth>Зарегистрироваться</Button>

                    <Button onClick={handleClickOpenSignIn} variant="outlined"
                            color="primary" fullWidth>Войти</Button>

                    {/*БЛОК "ВОЙТИ"*/}
                    <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal}/>
                    {/*БЛОК "РЕГИСТРАЦИИ"*/}
                   <RegistrationModal open={visibleModal === 'signUp'} onClose={handleCloseModal}/>

                    {/*{loadingStatus === LoadingStatus.SUCCESS &&*/}
                    {/*(<Notification text={'Авторизация успешна!'} type={'success'}/>)}*/}

                    {/*{loadingStatus === LoadingStatus.ERROR &&*/}
                    {/*(<Notification text='Неверный логин или пароль' type='error'/>)}*/}

                </div>

            </section>

        </div>
    );
};

