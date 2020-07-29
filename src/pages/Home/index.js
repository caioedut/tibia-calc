import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, Tooltip, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Container from '../../components/Container';
import menus from '../../config/menus';
import UtilHelper from '../../helpers/UtilHelper';
import useStyles from '../../hooks/styles';
import NewsService from '../../services/NewsService';

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
    const [news, setNews] = useState(null);
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles();

    useEffect(() => {
        (async function () {
            const response = await NewsService.list().catch(() => null);
            const news = response?.data?.newslist?.data;

            news && setNews(news.slice(0, 8));
        })();
    }, []);

    async function _handleToggleNews(item, isExpanded) {
        setExpanded(isExpanded ? item.id : false);

        if (item.content || !isExpanded) {
            return;
        }

        const response = await NewsService.get(item.id).catch(() => null);
        item.content = response?.data?.news?.content || 'Failed to get more info.';

        setNews([...news]);
    }

    return (
        <Container title="Tibia Calculators">
            <div className={classes.container}>
                <Box mb={2}>
                    <Typography variant="h5" p={15}>
                        Calculators
                    </Typography>
                </Box>
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
            </div>
            {news?.length > 0 && (
                <div className={classes.container}>
                    <Box mt={5} mb={2}>
                        <Typography variant="h5" p={15}>
                            News Ticker
                        </Typography>
                    </Box>
                    {news.map((item) => (
                        <Accordion
                            key={item.id}
                            expanded={expanded === item.id}
                            onChange={(e, isExpanded) => _handleToggleNews(item, isExpanded)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Tooltip title={UtilHelper.getDate(item.date).toLocaleDateString()}>
                                            <Chip
                                                clickable
                                                size="small"
                                                label={`${UtilHelper.dateAge(item.date)} ago`}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    {(!item.content || expanded !== item.id) && (
                                        <Grid item>
                                            <Typography>{item.news}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="div">
                                    {!!item.content ? ReactHtmlParser(item.content) : 'Loading...'}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            )}

        </Container>
    );
}

export default Home;