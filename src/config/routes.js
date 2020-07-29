import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Stamina from '../pages/Stamina';

function Routes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/stamina">
                    <Stamina/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;