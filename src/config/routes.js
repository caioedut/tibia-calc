import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/stamina">
                    <Stamina/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;