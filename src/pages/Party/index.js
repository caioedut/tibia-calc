import React, {useState} from 'react';
import {Box, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Container from '../../components/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 480,
    },
}));

function Party() {
    const [level, setLevel] = useState('');
    const [minLevel, setMinLevel] = useState(0);
    const [maxLevel, setMaxLevel] = useState(0);

    const classes = useStyles();

    function _handleChange(e) {
        const level = e.target.value;

        setLevel(level);

        // Min level: 2/3
        setMinLevel(Math.round(level / 3 * 2));
        setMaxLevel(Math.round(level * 3 / 2));
    }

    return (
        <Container title="Party Sharing Level Calculator">
            <Paper className={classes.paper}>
                <Grid container justify="center" spacing={1}>
                    <Grid item>
                        <TextField
                            id="current"
                            type="number"
                            label="Level"
                            autoFocus
                            value={level}
                            style={{width: 120}}
                            onChange={_handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}/>
                    {!!level && (
                        <Typography component="div">
                            <Grid item>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        Min.:
                                        <br/>
                                        Max.:
                                    </Grid>
                                    <Grid item>
                                        <Box textAlign="right">
                                            <b>{minLevel}</b>
                                            <br/>
                                            <b>{maxLevel}</b>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
                </Grid>
            </Paper>
        </Container>
    );
}

export default Party;