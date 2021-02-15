import React from 'react';
import {useDispatch} from "react-redux";

import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {IconButton, Tooltip} from "@material-ui/core";

import {UploadAvatars} from "../../componetns/UploadAvatar";
import {UserApi} from '../../restApi/userApi';
import {uploadFile} from "../../utils/uploadFile";
import {ImageObj} from '../../componetns/AddStoryForm/AddStoryForm';
import {FetchAuthAC} from "../../store/reducers/users/actionCreators";
import logo from "../../assets/profileAvatar.png"


//Обертка для Аватара Пользователя
const useProfileAvatarStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        height: '100%',
    },
    topBlock: {
        position: 'relative'
    },
    buttonBlock: {
        zIndex: 1,
        position: 'absolute',
        left: 0,
        top: '84%',
        width: '100%',
        '@media(max-width: 1700px)': {
            top: '84%',
            width: '100%',
            fontSize: '7px'
        }
    },
    img: {
        objectFit: 'cover',
        overflow: 'hidden',
        width: '100%',
    },
}));

interface ProfileAvatarProps {
    profileAvatar: string[]
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = React.memo(({profileAvatar}) => {
    const theme = useTheme();
    const classes = useProfileAvatarStyles();
    const dispatch = useDispatch()

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [avatar, setAvatar] = React.useState<ImageObj[]>([])
    const [isActive, setIsActive] = React.useState<boolean>(false)
    console.log('isActive =',isActive)

    if (!profileAvatar || isActive) {
        return <CircularProgress/>
    }

    const maxSteps = profileAvatar.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const disabledButton = (): void => {
        setIsActive((isActive) => !isActive)
    }

    const handleClickChangeAvatar = async (): Promise<void> => {
        disabledButton()
        let result = [];
        for (let i = 0; i < avatar.length; i++) {
            const file = avatar[i].file;
            const { url } = await uploadFile(file);
            result.push( url);
        }
        await UserApi.uploadProfileAvatar(result)
        dispatch(FetchAuthAC())
    };

    return (
        <div className={classes.wrapper}>

            <UploadAvatars images={avatar} onChangeImages={setAvatar}/>

            <div className={classes.topBlock}>
                <img className={classes.img}
                     src={(avatar.length !== 0) ? avatar[0].blobUrl : (profileAvatar.length > 0) ? profileAvatar[activeStep] : logo }
                     alt={profileAvatar[activeStep]}
                />
            </div>

            <div className={classes.buttonBlock}>
                <MobileStepper steps={maxSteps} position="static" variant="dots" activeStep={activeStep}
                               nextButton={ <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                   Next
                                   {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                               </Button> }
                               backButton={ <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                   {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                   Back
                               </Button>} />
            </div>

            {
                (avatar.length === 1)
            &&
                <IconButton onClick={handleClickChangeAvatar} color="primary"
                            style={{top: 0, right: 0, position: 'absolute'}}
                            disabled={isActive}>
                    <Tooltip title='Сохранить' interactive arrow placement='right-start'>
                        <CheckCircleIcon style={{ fontSize: 26 }} />
                    </Tooltip>
                </IconButton>
            }

        </div>
    );
})
