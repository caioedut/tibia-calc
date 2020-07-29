import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from '@material-ui/core';

import useStyles from '../../hooks/styles';
import Container from '../../components/Container';
import UtilHelper from '../../helpers/UtilHelper';

function Stamina() {
    const [current, setCurrent] = useState('39:00');
    const [target, setTarget] = useState('42:00');
    const [currentError, setCurrentError] = useState(false);
    const [targetError, setTargetError] = useState(false);
    const [bonusStamina, setBonusStamina] = useState(null);
    const [normalStamina, setNormalStamina] = useState(null);
    const [minutesOffline, setMinutesOffline] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        function calculate() {
            setCurrentError(false);
            setTargetError(false);

            let hrCurrent = (current.split(':')[0] || '');
            let mnCurrent = (current.split(':')[1] || '');

            let hrTarget = (target.split(':')[0] || '');
            let mnTarget = (target.split(':')[1] || '');

            // Check current time filled
            if (current.length !== 5) {
                return setCurrentError(true);
            }

            // Check target time filled
            if (target.length !== 5) {
                return setTargetError(true);
            }

            // Check if current bigger than target
            const nuCurrent = +`${hrCurrent}${mnCurrent}`;
            const nuTarget = +`${hrTarget}${mnTarget}`;

            if (nuCurrent >= nuTarget) {
                return setTargetError(true);
            }

            let minBonus = 0;
            let minNormal = 0;
            let minOffline = 0;

            for (let hr = +hrCurrent; hr <= +hrTarget; hr++) {
                const mnIni = hr === +hrCurrent ? +mnCurrent : 0;
                const mnEnd = hr === +hrTarget ? +mnTarget : 60;

                for (let mn = mnIni; mn < mnEnd; mn++) {
                    if (hr >= 39) {
                        minBonus++;
                    } else {
                        minNormal++;
                    }
                }
            }

            // Bonus: 6min off = 1min stamina
            const secBonus = minBonus * 60;
            minOffline += (secBonus * 6) / 60;

            // Normal: 6min off = 1min stamina
            const secNormal = minNormal * 60;
            minOffline += (secNormal * 3) / 60;

            setBonusStamina(minBonus);
            setNormalStamina(minNormal);
            setMinutesOffline(minOffline);
        }

        calculate();
    }, [current, target]);

    function _handleChange(e) {
        const attr = e.target.id;
        const setTime = attr === 'current' ? setCurrent : setTarget;

        let value = UtilHelper.mask(e.target.value, '##:##');

        const split = value.split(':');

        let hour = split.shift();
        let minute = split.pop();

        // Hour can't be lower 0 and higher 42
        if (typeof hour === 'string' && hour.length === 2) {
            hour = Math.max(hour, 0);
            hour = Math.min(hour, 42);
            hour = `${hour}`.padStart(2, '0');
        }

        // Minute can't be lower 0 and higher 59
        if (typeof minute === 'string' && minute.length === 2) {
            const maxMinute = hour >= 42 ? 0 : 59;
            minute = Math.max(minute, 0);
            minute = Math.min(minute, maxMinute);
            minute = `${minute}`.padStart(2, '0');
        }

        value = [hour, minute].filter(i => typeof i === 'string' && i.length > 0).join(':');

        setTime(value);
    }

    return (
        <Container title="Stamina Calculator">
            <Paper className={classes.paper}>
                <Grid container justify="center" spacing={1}>
                    <Grid item>
                        <TextField
                            id="current"
                            name="current"
                            label="Current Stamina"
                            autoFocus
                            error={currentError}
                            value={current}
                            InputLabelProps={{shrink: true}}
                            style={{width: 120}}
                            onChange={_handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="target"
                            name="target"
                            label="Target Stamina"
                            error={targetError}
                            value={target}
                            InputLabelProps={{shrink: true}}
                            style={{width: 120}}
                            onChange={_handleChange}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {minutesOffline !== null && !currentError && !targetError && (
                <Box component={Paper} className={classes.paper}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Bonus stamina to regenerate:
                                    </TableCell>
                                    <TableCell align="right">
                                        {UtilHelper.timeToString(bonusStamina)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Normal stamina to regenerate:
                                    </TableCell>
                                    <TableCell align="right">
                                        {UtilHelper.timeToString(normalStamina)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Offline time needed:
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>{UtilHelper.timeToString(minutesOffline)}</b>
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

export default Stamina;