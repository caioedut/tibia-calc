import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Typography} from '@material-ui/core';

import Container from '../../components/Container';
import menus from '../../config/menus';
import UtilHelper from '../../helpers/UtilHelper';

const screenStyles = {
    item: {
        position: 'relative',
        margin: 5,
        textDecoration: 'none',
    },
    title: {
        position: 'relative',
        color: '#eee',
        minWidth: 160,
        padding: '5px 15px',
        textAlign: 'center',
        textShadow: '2px 2px 5px rgba(0, 0, 0, .5)',
        zIndex: 1,
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
    },
};

function Home() {
    return (
        <Container title="Tibia Calculators">
            <Grid container justify="center" spacing={1}>
                {menus.map((menu) => (
                    <Grid item key={menu.url} component={Link} to={menu.url} style={screenStyles.item}>
                        <img
                            alt={menu.title}
                            src={UtilHelper.requireImage('panel.png')}
                            style={screenStyles.img}
                        />
                        <Typography component="h2" style={screenStyles.title}>
                            {menu.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Home;