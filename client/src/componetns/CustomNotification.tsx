import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps, Color} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface CustomProps {
    isOpen: boolean
    type: Color
    text: string
    autoHide: number
}

export const CustomNotification: React.FC<CustomProps> = ({isOpen, type, text, autoHide}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={autoHide} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}
