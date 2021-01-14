import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined'
import MessageIcon from '@material-ui/icons/EmailOutlined'
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined'
import ListIcon from '@material-ui/icons/ListAltOutlined'
import UserIcon from '@material-ui/icons/PermIdentityOutlined'
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined'
import CreateIcon from '@material-ui/icons/Create'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {NavLink} from "react-router-dom"
import {Tooltip} from "@material-ui/core"
import {useHomeStyles} from "../pages/Home/theme"
import {ModalBlock} from "./ModalBlock";
import {AddStoryForm} from "./AddStoryForm/AddStoryForm";


interface HeaderMenuProps {
    classes: ReturnType<typeof useHomeStyles>
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({classes}: HeaderMenuProps): React.ReactElement => {

    const [visibleAddStory, setSetVisibleAddStory] = React.useState<boolean>(false);

    const handleClickOpenAddStory = () => {
        setSetVisibleAddStory(true);
    };

    const onCloseAddStory = () => {
        setSetVisibleAddStory(false);
    };

    return (
        <div className={classes.headerWrapper}>
            <div>
                <ul className={classes.sideMenuList}>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title="Вернуться на главную" interactive className={classes.popper}>
                            <NavLink to='/home'>
                                <IconButton>
                                    <ImportContactsOutlinedIcon className={classes.logoIcon} aria-label=""
                                                                color="secondary"/>
                                </IconButton>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Поиск' interactive arrow>
                            <NavLink to='home'>
                                <div>
                                    <SearchIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Уведомления' interactive arrow>
                            <NavLink to='home'>
                                <div>
                                    <NotificationIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Сообщения' interactive arrow >
                            <NavLink to='home'>
                                <div>
                                    <MessageIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Закладки' interactive arrow>
                            <NavLink to='home'>
                                <div>
                                    <BookmarkIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Черновики' interactive arrow>
                            <NavLink to='home'>
                                <div>
                                    <ListIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                    <li className={classes.sideMenuListItem}>
                        <Tooltip title='Мой профиль' interactive arrow>
                            <NavLink to='/profile'>
                                <div>
                                    <UserIcon className={classes.sideMenuListItemIcon}/>
                                </div>
                            </NavLink>
                        </Tooltip>
                    </li>
                </ul>
            </div>
            <div>
                <Button
                    onClick={handleClickOpenAddStory}
                    className={classes.sideMenuButton}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size='large'>
                    <Hidden smDown>Опубликовать</Hidden>
                    <Hidden mdUp>
                        <CreateIcon/>
                    </Hidden>
                </Button>
                <ModalBlock onClose={onCloseAddStory} visible={visibleAddStory}>
                    <div style={{width: 550}}>
                        <AddStoryForm maxRows={15} onClose={onCloseAddStory}/>
                    </div>
                </ModalBlock>
            </div>
        </div>
    );
};
