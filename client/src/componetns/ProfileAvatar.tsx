import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {ImageObj} from './AddStoryForm/AddStoryForm';
import {UploadAvatars} from "./UploadAvatar";
import logo from "../assets/profileAvatar.png"
import CircularProgress from "@material-ui/core/CircularProgress";
import {uploadAvatar} from "../utils/uploadAvatar";
import { UserApi } from '../restApi/userApi';


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
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        left: 0
    },
}));

interface ProfileAvatarProps {
    profileAvatar: string[]
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({profileAvatar}) => {
    const theme = useTheme();
    const classes = useProfileAvatarStyles();
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const [avatar, setAvatar] = React.useState<ImageObj[]>([])
    const [newAvatar, setNewAvatar] = React.useState<string>('')
    console.log('avatar =',avatar, 'newAvatar =', newAvatar)
    if (!profileAvatar) {
        return <CircularProgress/>
    }

    const maxSteps = profileAvatar.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickChangeAvatar = async (): Promise<void> => {
        let result = [];
        for (let i = 0; i < avatar.length; i++) {
            const file = avatar[i].file;
            const { url } = await uploadAvatar(file);
            result.push( url);
        }
        setNewAvatar(result[0])
        await UserApi.uploadProfileAvatar(result[0])
        console.log('result сразу после запроса в форме добавления =', result)

    };

    return (
            <div className={classes.wrapper}>
                <UploadAvatars images={avatar} onChangeImages={setAvatar}/>
                <div className={classes.topBlock}>
                    <img className={classes.img}
                         src={newAvatar ? newAvatar : profileAvatar.length > 0 ? profileAvatar[activeStep] : logo }
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
                <button onClick={handleClickChangeAvatar}>Submit</button>
            </div>
    );
}
