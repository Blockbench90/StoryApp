import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {useStylesSignIn} from "../pages/SingIn/theme";
import {useHomeStyles} from "../pages/Home/theme";


interface ModalBlockProps {
    title?: string
    children: React.ReactNode
    visible?: boolean | undefined
    onClose: ()=>void
    classes: ReturnType<typeof useStylesSignIn>
    onCloseAddStory: ()=>void
}

//модальное окно
export const ModalBlock: React.FC<ModalBlockProps> = ({ title, onClose, visible = false, children, classes, onCloseAddStory}: ModalBlockProps): React.ReactElement | null => {
    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{ fontSize: 26 }} color="secondary" />
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};
