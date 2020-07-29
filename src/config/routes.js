import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Party from '../pages/Party';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <HashRouter basename="/">
            <Switch>
                <Route path="/party">
                    <Party/>
                </Route>
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