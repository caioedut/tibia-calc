import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';

function Header({title}) {
    const menus = [
        {
            url: '/stamina',
            title: 'Stamina',
        },
    ];

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    {title}
                </Typography>
                {menus.map((menu) => (
                    <Button key={menu.url} component={Link} to={`${process.env.PUBLIC_URL}${menu.url}`} variant="text">
                        <span style={{color: '#ffffff'}}>{menu.title}</span>
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}

export default Header;