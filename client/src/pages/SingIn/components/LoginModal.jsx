import React, {useRef} from "react";
import {ModalBlock} from "../../../componetns/ModalBlock";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useStylesSignIn} from "../theme";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Notification} from "../../../componetns/Notification";
import { loginUserData} from "../../../store/reducers/userReducer";

//схема таблици логинизации, валидация ошибок при вводе
const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Неверный формат почты').required('Введите почту'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
});


/*БЛОК "ВОЙТИ"*/
/* сделать поля tached"*/
const LoginModal = ({open, onClose}) => {
    //два варинанта развития событий, или норм или беда
    const SUCCESS = 'success'
    const ERROR = 'error'
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const openNotificationRef = useRef()
    const loadingStatus = useSelector(({user}) => user.status)

    //react-hook-form любезно предоставляет все обработчики, спасибо
    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(LoginFormSchema)
    });
    //при сабмите отправим в редакс данные, собранные из input
    const onSubmit = async (data) => {
        dispatch(loginUserData(data))
    };
    //проверим статус, и покажем пользователю сообщение в виде Alert
    React.useEffect(() => {
      if(loadingStatus === SUCCESS) {
            openNotificationRef.current('Авторизация успешна!', 'success');
            onClose();
        }
        else if (loadingStatus === ERROR) {
            openNotificationRef.current('Неверный логин или пароль', 'error');
        }
    }, [loadingStatus]);

    return (
        <Notification>
            {/*КОСТИЛЬ - дойдут руки, исправить, ленивый карась*/}
            {
                callback => {
                    openNotificationRef.current = callback
                    return (
                        <ModalBlock visible={open} classes={classes} title="Войти в аккаунт">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                                    <FormGroup aria-label="position" row>
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="email"
                                            className={classes.loginSideField}
                                            id="email"
                                            label="E-Mail"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            type="email"
                                            defaultValue=""
                                            helperText={errors.email?.message}
                                            error={!!errors.email}
                                            fullWidth
                                            autoFocus
                                        />
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="password"
                                            className={classes.loginSideField}
                                            id="password"
                                            label="Пароль"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            type="password"
                                            defaultValue=""
                                            helperText={errors.password?.message}
                                            error={!!errors.password}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" color="primary" fullWidth>
                                            Войти
                                        </Button>
                                    </FormGroup>
                                </FormControl>
                            </form>
                        </ModalBlock>
                    )
                }
            }
        </Notification>
    )
}
export default LoginModal


// <ModalBlock visible={open} onClose={onClose}
//             classes={classes} title="Создайте учетную запись">
//     <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
//         <FormGroup aria-label="position" row>
//             <TextField className={classes.registerField} autoFocus
//                        id="name" label="Имя" InputLabelProps={{shrink: true}}
//                        variant="filled" type="name" fullWidth/>
//             <TextField className={classes.registerField} autoFocus
//                        id="email" label="E-Mail" InputLabelProps={{shrink: true}}
//                        variant="filled" type="email" fullWidth/>
//             <TextField className={classes.registerField} autoFocus
//                        id="password" label="Пароль" InputLabelProps={{shrink: true}}
//                        variant="filled" type="password" fullWidth/>
//             <Button variant="contained" color="primary" fullWidth >
//                 Далее
//             </Button>
//         </FormGroup>
//     </FormControl>
// </ModalBlock>
//
//
