import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from '@material-ui/core';
import useStyles from '../../hooks/styles';

import Container from '../../components/Container';
import CharacterService from '../../services/CharacterService';
import UtilHelper from '../../helpers/UtilHelper';

function Age() {
    const [datetime, setDatetime] = useState(null);
    const [nick, setNick] = useState('');
    const [character, setCharacter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        (function () {
            const created = character?.account_information?.created;

            if (!created) {
                submitted && setError(true);
                return;
            }

            const tzDiff = created.timezone === 'CET' ? 1 : 2;
            const date = UtilHelper.getDate(created.date);

            date.setHours(date.getHours() - tzDiff);

            setDatetime(date);
        })();
    }, [character, submitted]);

    function _handleChange(e) {
        setError(false);
        setDatetime(null);
        setNick(e.target.value);
    }

    async function _handleSubmit(e) {
        e.preventDefault();

        setError(false);
        setLoading(true);

        const response = await CharacterService.get(nick).catch(() => setError(true));

        setCharacter(response?.data?.characters);
        setSubmitted(true);
        setLoading(false);
    }

    return (
        <Container title="Age Calculator">
            <Paper className={classes.paper}>
                <form noValidate onSubmit={_handleSubmit}>
                    <Grid container justify="center" alignItems="flex-end" spacing={1}>
                        <Grid item>
                            <TextField
                                type="search"
                                inputMode="search"
                                name="name"
                                label="Char Nick"
                                autoFocus
                                error={error}
                                helperText={error ? 'An error ocurred. Check if character is not hidden.' : null}
                                value={nick}
                                onChange={_handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!nick || loading}
                            >
                                {loading ? 'Checking...' : 'Check'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            {!!datetime && (
                <Box component={Paper} className={classes.paper}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Account age:
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>{UtilHelper.dateAge(datetime)} old</b>
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

export default Age;