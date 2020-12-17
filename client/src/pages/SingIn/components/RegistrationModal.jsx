import React from "react";
import {ModalBlock} from "../../../componetns/ModalBlock";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {useStylesSignIn} from "../theme";
import {Notification} from "../../../componetns/Notification";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {registerUserData} from "../../../store/reducers/userReducer";


const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Введите своё имя'),
    email: yup.string().email('Неверная почта').required('Введите почту'),
    username: yup.string().required('Введите логин'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
});

// сделать поля tached
//После регистрации бросает сразу на главную, подумать и исправить, там еще нет ни историй, ни токена
//а он положен, только верифицированным пользователям
//На беке сделать переадрисацию на почтовый ящик и правильное закрытие модального окна
{/*БЛОК "РЕГИСТРАЦИИ"*/}
const RegistrationModal =({open, onClose})=> {
    const SUCCESS = 'success'
    const ERROR = 'error'
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const openNotificationRef = React.useRef();
    const loadingStatus = useSelector(({user}) => user.status);

    const { control, handleSubmit, errors } = useForm({
        resolver: yupResolver(RegisterFormSchema)
    });

    const onSubmit = async (data) => {
        dispatch(registerUserData(data));
        console.log(data)
    };

    React.useEffect(() => {
        if (loadingStatus === SUCCESS) {
            openNotificationRef.current('Регистрация успешна!', 'success');
            onClose();
        } else if (loadingStatus === ERROR) {
            openNotificationRef.current('Ошибка при регистрации!', 'error');
        }
    }, [loadingStatus]);

    return (<Notification>
            {
                callback => {
                    openNotificationRef.current = callback;
                    return (
                        <ModalBlock
                            visible={open}
                            onClose={onClose}
                            classes={classes}
                            title="Войти в аккаунт">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                                    <FormGroup aria-label="position" row>
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="email"
                                            className={classes.registerField}
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
                                            name="username"
                                            className={classes.registerField}
                                            id="username"
                                            label="Логин"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            type="text"
                                            defaultValue=""
                                            helperText={errors.username?.message}
                                            error={!!errors.username}
                                            fullWidth
                                        />
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="fullname"
                                            className={classes.registerField}
                                            id="fullname"
                                            label="Ваше имя"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            type="text"
                                            defaultValue=""
                                            helperText={errors.fullname?.message}
                                            error={!!errors.fullname}
                                            fullWidth
                                        />
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="password"
                                            className={classes.registerField}
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
                                        <Controller
                                            as={TextField}
                                            control={control}
                                            name="password2"
                                            className={classes.registerField}
                                            id="password2"
                                            label="Пароль"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            type="password"
                                            defaultValue=""
                                            helperText={errors.password2?.message}
                                            error={!!errors.password2}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" color="primary" fullWidth>
                                            Регистрация
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
export default RegistrationModal