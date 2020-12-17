import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import React from 'react'

//HOC для отображения Alerta from MaterialUA
export const Notification = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [notificationObj, setNotificationObj] = React.useState();

    const openNotification = (text, type) => {
        setNotificationObj({
            text,
            type
        });
        setOpen(true);
    }

    return (
        <>
            {children(openNotification)}
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
                    {notificationObj?.text}
                </Alert>
            </Snackbar>
        </>
    )
}
