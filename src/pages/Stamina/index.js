import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Container from '../../components/Container';
import UtilHelper from '../../Helpers/UtilHelper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 480,
    },
}));

function Stamina() {
    const [formError, setFormError] = useState(false);
    const [current, setCurrent] = useState('39:00');
    const [target, setTarget] = useState('42:00');
    const [bonusStamina, setBonusStamina] = useState(null);
    const [normalStamina, setNormalStamina] = useState(null);
    const [minutesOffline, setMinutesOffline] = useState(null);

    const classes = useStyles();

    function _handleChange(e) {
        const setTime = e.target.id === 'current' ? setCurrent : setTarget;

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
            minute = Math.max(minute, 0);
            minute = Math.min(minute, 59);
            minute = `${minute}`.padStart(2, '0');
        }

        value = [hour, minute].filter(i => typeof i === 'string' && i.length > 0).join(':');

        setTime(value);
        setFormError(false);
        setMinutesOffline(null);
    }

    function _handleSubmit(e) {
        e.preventDefault();

        let hrCurrent = (current.split(':')[0] || '').padStart(2, '0');
        let mnCurrent = (current.split(':')[1] || '').padStart(2, '0');

        let hrTarget = (target.split(':')[0] || '').padStart(2, '0');
        let mnTarget = (target.split(':')[1] || '').padStart(2, '0');

        setCurrent(`${hrCurrent}:${mnCurrent}`);
        setTarget(`${hrTarget}:${mnTarget}`);

        // Check if current bigger than target
        const nuCurrent = +`${hrCurrent}${mnCurrent}`;
        const nuTarget = +`${hrTarget}${mnTarget}`;

        if (nuCurrent >= nuTarget) {
            setFormError(true);
            return false;
        }

        // Check total stamina wasted
        // Hour to minutes
        let minTotalWasted = (hrTarget - hrCurrent) * 60;
        // Sum minutes
        minTotalWasted += mnTarget - mnCurrent;

        let minBonus = 0;
        let minNormal = 0;
        let minOffline = 0;

        // Verificar bonus
        if (hrTarget >= 39) {
            minBonus = (hrTarget - Math.max(39, +hrCurrent)) * 60;
            minBonus += mnTarget - mnCurrent;
        }

        minOffline = minTotalWasted - minBonus;

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

    return (
        <Container title="Stamina Calculator">
            <Paper className={classes.paper}>
                <form noValidate autoComplete="off" onSubmit={_handleSubmit}>
                    <Grid container justify="center" spacing={1}>
                        <Grid item>
                            <TextField
                                id="current"
                                label="Current Stamina"
                                error={formError}
                                value={current}
                                InputLabelProps={{shrink: true}}
                                style={{width: 120}}
                                onChange={_handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="target"
                                label="Target Stamina"
                                error={formError}
                                value={target}
                                InputLabelProps={{shrink: true}}
                                style={{width: 120}}
                                onChange={_handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}/>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">
                                Calculate
                            </Button>
                        </Grid>
                        <Grid item xs={12}/>
                        {(minutesOffline !== null) && (
                            <Typography component="div">
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            Bonus stamina to regenerate:
                                            <br/>
                                            Normal stamina to regenerate:
                                            <br/>
                                            <b>Offline time needed:</b>
                                        </Grid>
                                        <Grid item>
                                            <Box textAlign="right">
                                                {UtilHelper.timeToString(bonusStamina)}
                                                <br/>
                                                {UtilHelper.timeToString(normalStamina)}
                                                <br/>
                                                <b>{UtilHelper.timeToString(minutesOffline)}</b>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Typography>
                        )}
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Stamina;