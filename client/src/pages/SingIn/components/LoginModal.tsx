import React, {useEffect, useState} from "react"
import {ModalBlock} from "../../../componetns/ModalBlock"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import {Button} from "@material-ui/core"
import {useStylesSignIn} from "../theme"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import {FetchLoginAC} from "../../../store/reducers/users/actionCreators"
import {selectUserStatus} from "../../../store/reducers/users/selectors";
import {LoadingStatus} from "../../../store/types";
import {CustomNotification} from "../../../componetns/CustomNotification";

export interface LoginFormProps {
    email: string
    password: string
}

interface LoginModalProps {
    open: boolean
    onClose: () => void
}

//схема таблици логинизации, валидация ошибок при вводе
const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Неверный формат почты').required('Введите почту'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
});

/*БЛОК "ВОЙТИ"*/
const LoginModal: React.FC<LoginModalProps> = ({open, onClose}): React.ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const loadingStatus = useSelector(selectUserStatus);
    const [message, setMessage] = useState<'error' | 'success'>()


    //react-hook-form любезно предоставляет все обработчики, спасибо
    const {control, handleSubmit, errors} = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });

    //при сабмите отправим в редакс данные, собранные из input
    const onSubmit = async (data: LoginFormProps) => {
        dispatch(FetchLoginAC(data))
    };

    useEffect(() => {
         if (loadingStatus === LoadingStatus.ERROR) {
            setMessage('error')
        }
    }, []);
    return (
        <>
            {message === 'error' ? <CustomNotification isOpen={true} type={'error'}
                    text={'Где-то Вы, уважаемый, дали в штангу 😄'} autoHide={5000}/> : null}
            <ModalBlock visible={open} onClose={onClose} classes={classes} title="Войти в аккаунт">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                        <FormGroup aria-label="position" row>
                            <Controller as={TextField} control={control} name="email"
                                        className={classes.loginSideField} id="email"
                                        label="E-Mail" InputLabelProps={{shrink: true}}
                                        variant="filled" type="email" defaultValue=""
                                        helperText={errors.email?.message}
                                        error={!!errors.email} fullWidth autoFocus/>

                            <Controller as={TextField} control={control} name="password"
                                        className={classes.loginSideField} id="password"
                                        label="Пароль" InputLabelProps={{shrink: true}}
                                        variant="filled" type="password" defaultValue=""
                                        helperText={errors.password?.message}
                                        error={!!errors.password} fullWidth/>

                            <Button type="submit" variant="contained" fullWidth>Войти</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </ModalBlock>
        </>
    )
}

export default LoginModal