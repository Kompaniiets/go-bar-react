import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SideNavMenu from './SideNavMenu';
import Auth from '../services/AuthService';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

export default class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <SecretRoute path="/register" component={Register}/>
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}
