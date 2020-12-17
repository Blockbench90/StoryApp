import React, {useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import {useStylesSignIn} from "./theme";
import LoginModal from "./components/LoginModal";
import RegistrationModal from "./components/RegistrationModal";
import {useDispatch} from "react-redux";


export const SignIn = () => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch()
    //установка видимости модального окна
    const [visibleModal, setVisibleModal] = useState('signIn' | 'signUp');
    //для входа
    const handleClickOpenSignIn = () => {
        dispatch(fetch)
        setVisibleModal('signIn');
    };
    //для регистрации
    const handleClickOpenSignUp = () => {
        setVisibleModal('signUp');
    };
    //для закрытия
    const handleCloseModal = () => {
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

                    <ImportContactsOutlinedIcon color="primary" className={classes.loginSideTwitterIcon}/>
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

                </div>
            </section>
        </div>
    );
};

