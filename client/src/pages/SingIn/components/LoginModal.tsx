import React, {useRef} from "react"
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
import {selectUserStatus} from "../../../store/reducers/users/selectors"
import {LoadingStatus} from "../../../store/types"
import {FetchLoginAC} from "../../../store/reducers/users/actionCreators"
import {Color} from "@material-ui/lab/Alert";

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

//TODO: сделать поля tached"

/*БЛОК "ВОЙТИ"*/
const LoginModal: React.FC<LoginModalProps> = ({open, onClose}): React.ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const openNotificationRef = useRef<(text: string, type: Color) => void>(() => {})
    const loadingStatus = useSelector(selectUserStatus)

    //react-hook-form любезно предоставляет все обработчики, спасибо
    const {control, handleSubmit, errors} = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });
    //при сабмите отправим в редакс данные, собранные из input
    const onSubmit = async (data: LoginFormProps) => {
        dispatch(FetchLoginAC(data))
    };
    //проверим статус, и покажем пользователю сообщение в виде Alert
    React.useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            openNotificationRef.current('Авторизация успешна!', 'success');
            onClose();
        } else if (loadingStatus === LoadingStatus.ERROR) {
            openNotificationRef.current('Неверный логин или пароль', 'error');
        }
    }, [loadingStatus, onClose]);
    return (
        <ModalBlock visible={open} onClose={onClose} classes={classes} title="Войти в аккаунт">
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
                        <Button type="submit" variant="contained" fullWidth>
                            Войти
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    )
}

export default LoginModal