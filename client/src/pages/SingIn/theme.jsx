import {makeStyles} from "@material-ui/core";

export const useStylesSignIn = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        height: '100vh',
        backgroundColor: 'rgba(5, 82, 76, 0.8)',
        overflow: 'hidden',
    },
    loadingApp: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    loadingIcon: {
        position: 'absolute',
        left: '-5%',
        top: '39%',
        transform: 'translate(-50%, -50%)',
        width: 130,
        height: 130
    },
    loadingCircul: {
        fontSize: '40px'
    },
    leftSide: {
        flex: '0 0 50%',
        position: 'relative',
    },
    leftSideBigIcon: {
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translate(-3%, -17%)',
        width: '135%',
        height: '135%',
        color: 'rgba(5, 82, 76, 0.8)'
    },
    loginSide: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 50%',
    },
    loginSideTwitterIcon: {
        fontSize: 45,
    },
    loginSideWrapper: {
        maxWidth: 380,
    },
    loginSideTitle: {
        fontWeight: 700,
        fontSize: 32,
        marginBottom: 50,
        marginTop: 20,
        paddingLeft: theme.spacing(5)
    },
    loginSubTitle: {
        marginBottom: theme.spacing(3),
        paddingLeft: theme.spacing(9)
    },
    loginSideField: {
        marginBottom: 18,
    },
    registerField: {
        marginBottom: theme.spacing(5),
    },
    loginFormControl: {
        marginBottom: theme.spacing(2),
    },
}));