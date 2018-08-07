import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../services/AuthService';

const AuthService = new Auth();

const PrivateRoute  = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.loggedIn() ?
            <Component {...props} /> :
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
    )}/>
);

export default PrivateRoute;