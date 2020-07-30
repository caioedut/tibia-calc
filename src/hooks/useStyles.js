import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        maxWidth: 860,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: theme.spacing(2),
        maxWidth: 480,
    },
}));

export default useStyles;