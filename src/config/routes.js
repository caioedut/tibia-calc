import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <HashRouter basename="/">
            <Switch>
                <Route path="/stamina">
                    <Stamina/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default Routes;