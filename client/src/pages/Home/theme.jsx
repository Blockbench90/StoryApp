import {makeStyles} from "@material-ui/styles";
import grey from "@material-ui/core/colors/grey";
import {colors} from "@material-ui/core";

export const useHomeStyles = makeStyles((theme) => ({
    wrapper: {
        height: '100vh',
    },
    logo: {
        margin: '10px 0',
    },
    logoIcon: {
        fontSize: 40,
    },
    modalMenu: {
        '@media (min-width:600px)': {
            display: 'none',
        }
    },
    menuHeader: {
        '@media (max-width:600px)': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 20
        }
    },
    popper: {
        height: '100px',
        fontSize: '20px'
    },
    sideMenuList: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '10px',
        bottom: '30px',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxWidth: '100vw',
        '@media (max-width:600px)': {
            display: 'none',
        }
    },
    sideMenuListItem: {
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
        cursor: 'pointer',
        '&:hover': {
            '& div': {
                paddingTop: 0,
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                '& h6': {
                    color: theme.palette.primary.main,
                },
                '& svg path': {
                    fill: theme.palette.primary.main,
                },
            },
        },

        '& div': {
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            padding: '5px 25px 0px 26px',
            borderRadius: 30,
            height: 50,
            marginBottom: 5,
            marginTop: 10,
            transition: 'background-color 0.1s ease-in-out',
        },
    },
    sideMenuListItemLabel: {
        fontWeight: 400,
        fontSize: 15,
        marginLeft: 15,
        marginTop: 10,
        '@media (max-width:1350px)': {
            display: 'none',
        },
    },
    sideMenuListItemIcon: {
        fontSize: 35,
        marginLeft: -10,
    },
    sideMenuTweetButton: {
        paddingLeft: theme.spacing(5.5),
        paddingRight: theme.spacing(5.5),
        padding: theme.spacing(3.2),
        marginTop: theme.spacing(1.7),
    },
    storyWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        borderRadius: 0,
        height: '100%',
        borderTop: '0',
        borderBottom: '0',
    },
    storyCentred: {
        marginTop: 50,
        textAlign: 'center',
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
    story: {
        display: 'flex',
        cursor: 'pointer',
        paddingTop: 15,
        paddingLeft: 10,
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
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
    storyFooter: {
        display: 'flex',
        position: 'relative',
        left: -13,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    storyUserName: {
        color: grey[500],
    },
    storyCon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    storyHed: {
        flex: 1
    },
    fullStory: {
        padding: 22,
        paddingBottom: 0,
    },
    fullStoryText: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20,
        lineHeight: 1.3125,
        wordBreak: 'break-word',
    },
    fullStoryFooter: {
        margin: '0 auto',
        borderTop: '1px solid #E6ECF0',
        left: 0,
        maxWidth: '100%',
        justifyContent: 'space-around',
        padding: '2px 0',
        marginTop: 20,
    },
    rightSide: {
        width: 210,
        paddingTop: 20,
        position: 'sticky',
        top: 0,
        '@media(max-width: 640px)': {
            display: 'none'
        }
    },
    rightSideBlock: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: 15,
        marginTop: 20,
        '& .MuiList-root': {
            paddingTop: 0,
        },
    },
    rightSideBlockHeader: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        backgroundColor: 'transparent',
        padding: '13px 18px',
        '& b': {
            fontSize: 20,
            fontWeight: 800,
        },
    },
    rightSideBlockItem: {
        cursor: 'pointer',
        '& .MuiTypography-body1': {
            fontWeight: 700,
        },
        '& .MuiListItemAvatar-root': {
            minWidth: 30,
        },
        '& .MuiListItemText-root': {
            margin: 0,
        },
        '&:hover': {
            backgroundColor: '#edf3f6',
        },
    },
    addForm: {
        padding: 20,
    },
    addFormBody: {
        display: 'flex',
        width: '100%',
    },
    addFormBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    addFormBottomLine: {
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
    sideProfile: {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        bottom: 30,
        padding: '10px 15px',
        width: 260,
        borderRadius: 50,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.lightBlue[50],
        },
    },
    sideProfileInfo: {
        flex: 1,
        marginLeft: 10,
        '& b': {
            fontSize: 16,
        },
    },
}))

