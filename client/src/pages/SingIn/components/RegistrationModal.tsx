import React, {useEffect, useState} from "react";
import {ModalBlock} from "../../../componetns/ModalBlock";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {useStylesSignIn} from "../theme";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {FetchRegistrationAC} from "../../../store/reducers/users/actionCreators";
import {selectUserStatus} from "../../../store/reducers/users/selectors";
import {LoadingStatus} from "../../../store/types";
import {CustomNotification} from "../../../componetns/CustomNotification";

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

export interface RegisterFormProps {
    fullname: string;
    username: string;
    email: string;
    password: string;
    password2: string;
}

const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Введите своё имя'),
    email: yup.string().email('Неверная почта').required('Введите почту'),
    username: yup.string().required('Введите логин'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
});

{/*БЛОК "РЕГИСТРАЦИИ"*/
}
const RegistrationModal: React.FC<RegisterModalProps> = ({open, onClose}): React.ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();

    const loadingStatus = useSelector(selectUserStatus);
    const [message, setMessage] = useState<'error' | 'success'>()

    const {control, handleSubmit, errors} = useForm<RegisterFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    });

    const onSubmit = async (data: RegisterFormProps) => {
        dispatch(FetchRegistrationAC(data));
    };

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            setMessage('success')
        } else if (loadingStatus === LoadingStatus.ERROR) {
            setMessage('error')
        }

    }, []);

    return (
        <>
            {message === 'error' ? <CustomNotification isOpen={true} type={'error'}
                                                       text={'Где-то Вы, уважаемый, дали в штангу 😄'} autoHide={5000}/> : null}
            {message === 'success' ? <CustomNotification isOpen={true} type={'success'}
                                                       text={'Поздравляем, аккаунт создан. Бегите на почту за подтверждением 👍'} autoHide={15000}/> : null}
            <ModalBlock visible={open} onClose={onClose} classes={classes} title="Создать аккаунт">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                        <FormGroup aria-label="position" row>
                            <Controller as={TextField} control={control} name="email" className={classes.registerField}
                                        id="email" label="E-Mail" InputLabelProps={{shrink: true}} variant="filled"
                                        type="email" defaultValue="" helperText={errors.email?.message}
                                        error={!!errors.email}
                                        fullWidth autoFocus/>

                            <Controller as={TextField} control={control} name="username"
                                        className={classes.registerField}
                                        id="username" label="Логин" InputLabelProps={{shrink: true}} variant="filled"
                                        type="text"
                                        defaultValue="" helperText={errors.username?.message} error={!!errors.username}
                                        fullWidth/>

                            <Controller as={TextField} control={control} name="fullname"
                                        className={classes.registerField}
                                        id="fullname" label="Ваше имя" InputLabelProps={{shrink: true}} variant="filled"
                                        type="text" defaultValue="" helperText={errors.fullname?.message}
                                        error={!!errors.fullname}
                                        fullWidth/>

                            <Controller as={TextField} control={control} name="password"
                                        className={classes.registerField}
                                        id="password" label="Пароль" InputLabelProps={{shrink: true}} variant="filled"
                                        type="password"
                                        defaultValue="" helperText={errors.password?.message} error={!!errors.password}
                                        fullWidth/>

                            <Controller as={TextField} control={control} name="password2"
                                        className={classes.registerField}
                                        id="password2" label="Пароль" InputLabelProps={{shrink: true}} variant="filled"
                                        type="password"
                                        defaultValue="" helperText={errors.password2?.message}
                                        error={!!errors.password2} fullWidth/>

                            <Button type="submit" variant="contained" color="primary" fullWidth>Регистрация</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </ModalBlock>
        </>
    )
}

export default RegistrationModal