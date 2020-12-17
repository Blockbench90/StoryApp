import makeStyles from "@material-ui/core/styles/makeStyles";

export const useProfileStyles = makeStyles((theme) => ({
    wrapper: {
        flexGrow: 1,
        // backgroundColor: 'rgba(29, 100, 100, 0.1)',
        flexWrap: "wrap",
    },
    paperLeft: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(29, 100, 100, 0.6)',
        width: '20vw',
        height: '70vh',
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '2%',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
    },
    infoWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 10px'
    },
    paperRight: {
        position: 'relative',
        padding: theme.spacing(5),
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
        width: theme.spacing(40),
        height: theme.spacing(50),
        border: "1px solid white",
        margin: "auto"
    },
    profileInfoContainer: {
        position: "relative",
        top: "-10px",
        margin: "auto"
    },
    userName: {
        fontWeight: "bold",
        marginBottom: 0
    },
    userTag: {
        marginTop: 0
    },
    contentContainer: {
        position: "relative",
        top: "-90px"
    }
}));
