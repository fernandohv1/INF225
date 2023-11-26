import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import Login from './Login';
//import Register from './Register';
import App from './App';
import Reserva from './Reserva';

const Router = () => (
    <BrowserRouter>
        <Switch>
            {/*<Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/aux" component={Aux} />*/}
            <Route exact path="/aux" component={Aux} />
            <Route exact path="/aux" component={Aux} />
        </Switch>
    </BrowserRouter>
);

export default Router;