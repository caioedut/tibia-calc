import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/stamina`}>
                    <Stamina/>
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/`}>
                    <Home/>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default Routes;