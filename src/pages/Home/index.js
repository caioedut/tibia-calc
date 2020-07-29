import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Card, Grid, Typography} from '@material-ui/core';

import Container from '../../components/Container';
import menus from '../../config/menus';
import UtilHelper from '../../helpers/UtilHelper';
import useStyles from '../../hooks/styles';

function Home() {
    const classes = useStyles();

    return (
        <Container title="Tibia Calculators">
            <Grid container justify="center" spacing={1}>
                {menus.map((menu) => (
                    <Grid item key={menu.url} component={Link} to={menu.url} style={{textDecoration: 'none'}}>
                        <Card className={classes.root}>
                            <img
                                alt={menu.title}
                                src={UtilHelper.requireImage(menu.img)}
                                style={{backgroundColor: '#666'}}
                            />
                            <Box px={2} py={1}>
                                <Typography variant="h6" component="h2">
                                    {menu.title}
                                </Typography>
                            </Box>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Home;