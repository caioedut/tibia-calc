import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Header({title}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const route = useLocation().pathname;

    const menus = [
        {
            url: '/stamina',
            title: 'Stamina',
        },
        {
            url: '/party',
            title: 'Party Share',
        },
    ];

    function _handleOpenMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    function _handleCloseMenu(e) {
        setAnchorEl(null);
    }

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {route !== '/' && (
                    <IconButton edge="start" color="inherit" to="/" component={Link}>
                        <ArrowBackIcon/>
                    </IconButton>
                )}
                <Typography variant="h6" style={{flexGrow: 1}}>
                    {title}
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={_handleOpenMenu}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={_handleCloseMenu}
                >
                    {menus.map((menu) => (
                        <MenuItem
                            key={menu.url}
                            variant="text"
                            to={menu.url}
                            component={Link}
                            onClick={_handleCloseMenu}
                        >
                            {menu.title}
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;