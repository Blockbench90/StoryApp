import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


//Обертка для Аватара Пользователя

//пример прилетевшей даты
const tutorialSteps = [
    {
        imgPath:
            'https://images.unsplash.com/photo-1578505574290-68739d054931?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1607842858972-a9352fbd13c8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1584088743546-db0289ee9b07?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1579610520129-963c74781ffb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
        imgPath:
            'https://images.unsplash.com/photo-1578252130460-622f3f8a9a61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fHdvbWFuJTIwZmFjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
];

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
        top: '88%',
        width: '100%'
    },
    img: {
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        left: 0
    },
}));

export default function ProfileAvatar() {
    const theme = useTheme();
    const classes = useProfileAvatarStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
            <div className={classes.wrapper}>
                <div className={classes.topBlock}>
                    <img
                        className={classes.img}
                        src={tutorialSteps[activeStep].imgPath}
                        alt={tutorialSteps[activeStep].label}
                    />
                </div>

                <div className={classes.buttonBlock}>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="dots"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                Back
                            </Button>
                        }
                    />
                </div>
            </div>
    );
}
