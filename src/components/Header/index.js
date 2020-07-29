import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Button, Toolbar, Typography, IconButton} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Header({title}) {
    const menus = [
        {
            url: '/stamina',
            title: 'Stamina',
        },
    ];

    const route = useLocation().pathname;

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                {route !== '/' && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        component={Link}
                        to={`${process.env.PUBLIC_URL}/`}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                )}
                <Typography variant="h6" style={{flexGrow: 1}}>
                    {title}
                </Typography>
                {menus.map((menu) => (
                    <Button
                        key={menu.url}
                        variant="text"
                        component={Link}
                        to={`${process.env.PUBLIC_URL}${menu.url}`}
                    >
                        <span style={{color: '#ffffff'}}>{menu.title}</span>
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}

export default Header;