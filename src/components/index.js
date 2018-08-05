import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SideNavMenu from './SideNavMenu';
import Auth from '../services/AuthService';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const PrivateRoute  = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated ?
            <Component {...props} auth={Auth.isAuthenticated} /> :
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
    )}/>
);

export default class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideNavMenu/>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/register" component={Register}/>
                            {/*<PrivateRoute path="/register" component={Register}/>*/}
                            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}
