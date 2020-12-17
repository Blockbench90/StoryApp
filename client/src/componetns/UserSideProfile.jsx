import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import React from 'react';


export const UserSideProfile = ({classes}) => {
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const anchorRef = React.useRef();

    const handleOpenPopup = (event) => {
        anchorRef.current = event.currentTarget;
        setVisiblePopup(true);
    };

    const handleClosePopup = () => {
        setVisiblePopup(false);
    };

    return (
        <>
            <div onClick={handleOpenPopup} className={classes.sideProfile}>
                <Avatar  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>
                <div className={classes.sideProfileInfo}>
                    <b>Ivan Susanin</b>
                    <Typography style={{ color: colors.grey[500] }}>@ivantolk</Typography>
                </div>
                <ArrowBottomIcon />
            </div>
            <Popover
                open={visiblePopup}
                onClose={handleClosePopup}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>
                История еще не опубликована
            </Popover>
        </>
    );
};
