 // @ts-nocheck
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";

export const useProfileStyles = makeStyles((theme) => ({
    wrapper: {
        flexGrow: 1,
        // backgroundColor: 'rgba(29, 100, 100, 0.1)',
        flexWrap: "wrap",
    },
    paperLeft: {
        position: 'absolute',
        zIndex: 1,
        top: '20px',
        position: 'sticky',
        backgroundColor: 'rgba(29, 100, 100, 0.6)',
        width: '14vw',
        height: '45vh',
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '2%',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        '@media(max-width: 1700px)': {
            width: '14vw',
            height: '51vh',
        }
    },
    infoWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 10px',
        '@media(max-width: 1700px)': {
            display: 'inline'
        }
    },
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
    addFormBottomActions: {
        marginTop: 10,
        paddingLeft: 70,
    },
    addFormTextareaWrapper: {
        width: '100%'
    },
    addFormTextareaTitle: {
        width: '100%',
        border: '1px solid rgba(169, 187, 184, 0.09)',
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
    storyFooterLine: {
        height: 12,
        backgroundColor: '#E6ECF0',
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
    paperRight: {
        position: 'relative',
        padding: theme.spacing(2.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        position: 'relative',
        overflow: 'hidden',
        height: '10vh',
        borderLeft: '50px'
    },
    profileImage: {
        position: "relative",
        top: "-10px",
        justifyContent: "center",
        width: '220px',
        height: '300px',
        border: "1px solid white",
        margin: "auto",
        '@media(max-width: 1700px)': {
            width: '110px',
            height: '150px',
        }

    },
    profileInfoContainer: {
        position: "relative",
        top: "-10px",
        margin: "auto"
    },
    userName: {
        fontSize: '15px',
        fontWeight: "bold",
        marginBottom: 0,
        '@media(max-width: 1700px)': {
            fontSize: '10px'
        }
    },
    userTag: {
        marginTop: 0
    },
    contentContainer: {
        position: "relative",
        top: "-90px"
    },
    storyCentred: {
        marginTop: 50,
        textAlign: 'center',
    },storyWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 0,
        height: '100%',
        borderTop: '0',
        borderBottom: '0',
    },
    storyCentred: {
        marginTop: '150px',
        textAlign: 'center',
        marginLeft: '25vw'

    },
    storyHeader: {
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        padding: '10px 15px',
        '& h6': {
            fontWeight: 800,
        },
    },
    storyHeaderUser: {
        display: 'flex',
        alignItems: 'center',
    },
    storyHeaderBackButton: {
        marginRight: 20,
    },
    storyWrapperHide: {
        height: '25vh',
        overflow: 'hidden'
    },
    storyWrapper: {
        height: '100%'
    },
    story: {
        display: 'flex',
        cursor: 'pointer',
        paddingTop: 15,
        paddingLeft: 10,
        wordBreak: 'break-all',
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    storyFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        margin: '0 auto',
        left: -13,
        maxWidth: 450,
    },
    storyUserName: {
        color: grey[500],
    },
    imgWrapper: {
        textAlign:"center",
        '& img': {
            height: '250px',
            borderRadius: '30px'
        },
    },
    storyCon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    storyHed: {
        flex: 1
    },
    logoutButton: {
        margin: '50px 0 0 0'
    }
}));
