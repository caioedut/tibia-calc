import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/stamina`}>
                    <Stamina/>
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/`}>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;