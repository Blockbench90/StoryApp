import makeStyles from "@material-ui/core/styles/makeStyles";


export const useAddFormStyles = makeStyles((theme) => ({
    addForm: {
        padding: 20,
    },
    addFormBody: {
        display: 'flex',
        width: '100%',
    },
    addFormBottomActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Picker: {

    },
    storyAvatar: {
        display: 'flex-start',
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: 10,
        '@media (max-width:1100px)': {
            width: theme.spacing(4.5),
            height: theme.spacing(4.5),
        },
        '@media (max-width:890px)': {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        '@media (max-width:600px)': {
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
        }
    },
    storyFooterLine: {
        // height: 12,
        // backgroundColor: '#E6ECF0',
    },
    addFormTextareaWrapper: {
        width: '100%'
    },
    addFormTextareaTitle: {
        width: '100%',
        border: '1px solid rgba(169, 187, 184, 0.19)',
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
    },
    addFormTextarea: {
        width: '100%',
        border: 0,
        fontSize: 20,
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'none',
    },
    addFormBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    storyFooter: {
        display: 'flex',
        position: 'relative',
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    addFormCircleProgress: {
        position: 'relative',
        width: 20,
        height: 20,
        margin: '0 10px',
        '& .MuiCircularProgress-root': {
            position: 'absolute',
        },
    },
    addFormBottomRight: {
        display: 'flex',
        alignItems: 'center',
    },
    addFormBottomLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
    },
}));