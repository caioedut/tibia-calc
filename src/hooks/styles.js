import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: theme.spacing(2),
        maxWidth: 480,
    },
}));

export default useStyles;