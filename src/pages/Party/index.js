import React, {useState} from 'react';
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from '@material-ui/core';
import useStyles from '../../hooks/styles';

import Container from '../../components/Container';

function Party() {
    const [level, setLevel] = useState('');
    const [minLevel, setMinLevel] = useState(0);
    const [maxLevel, setMaxLevel] = useState(0);

    const classes = useStyles();

    function _handleChange(e) {
        const level = Math.max(0, Math.min(9999, e.target.value));

        setLevel(`${level}`);

        // Min level: 2/3
        setMinLevel(Math.round(level / 3 * 2));
        setMaxLevel(Math.round(level * 3 / 2));
    }

    return (
        <Container title="Party Share Calculator">
            <Paper className={classes.paper}>
                <Grid container justify="center" spacing={1}>
                    <Grid item>
                        <TextField
                            type="number"
                            inputMode="numeric"
                            name="level"
                            label="Level"
                            autoFocus
                            value={level}
                            style={{width: 120}}
                            onChange={_handleChange}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {!!level && (
                <Box component={Paper} className={classes.paper}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Min.:
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>{minLevel}</b>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Max.:
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>{maxLevel}</b>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Container>
    );
}

export default Party;