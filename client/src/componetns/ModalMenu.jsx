import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ModalMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" variant="outlined" color="primary"  aria-haspopup="true" onClick={handleClick} >
                Меню
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                <MenuItem color='primary' onClick={handleClose}>Главная</MenuItem>
                <MenuItem onClick={handleClose}>Поиск</MenuItem>
                <MenuItem onClick={handleClose}>Уведомления</MenuItem>
                <MenuItem onClick={handleClose}>Сообщения</MenuItem>
                <MenuItem onClick={handleClose}>Закладки</MenuItem>
                <MenuItem onClick={handleClose}>Список</MenuItem>
                <MenuItem onClick={handleClose}>Ппофиль</MenuItem>
            </Menu>
        </div>
    );
}
